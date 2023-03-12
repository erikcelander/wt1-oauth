import { IGitLabAPIService } from '../interfaces/IGitLabAPIService'
import axios from 'axios'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { GitLabGroup, GitLabActivity } from '@/lib/types/types'

/**
 * Implementation of the IGitLabAPIService interface that communicates with the GitLab API.
 */
export class GitLabAPIService implements IGitLabAPIService {

  /**
   * Gets a list of recent activities for the authorized user.
   * @param {string} accessToken - The access token used to authenticate the user.
   * @param {number} per_page - The number of activities per page.
   * @param {number} page - The page number.
   * @returns {Promise<GitLabActivity[]>} - A promise that resolves to a list of activities.
   */
  async getRecentActivities(accessToken: string, per_page: number, page: number): Promise<GitLabActivity[]> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_GITLAB_API_URL}/events`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          per_page: per_page,
          page: page
        }
      })

      let activities = response.data
      activities = activities.map((activity: GitLabActivity) => {

        if (activity.push_data) {
          return {
            id: activity.id,
            action: activity.push_data.action,
            created_at: new Date(activity.created_at).toISOString().substring(0, 10),
            commit_title: activity.push_data.commit_title,
          }
        } else {
          return {
            id: activity.id,
            action: activity.action_name,
            created_at: new Date(activity.created_at).toISOString().substring(0, 10),
            commit_title: activity.target_title,
          }
        }
      })

      return activities as GitLabActivity[]
    } catch (error: any) {
      console.error(error)
      throw new Error(`Failed to get recent activities: ${error.message}`)
    }
  }


  /**
   * Gets a list of activities for the authorized user.
   * @param {string} accessToken - The access token used to authenticate the user.
   * @returns {Promise<{ lastActivityOn: string, activities: GitLabActivity[] }>} - A promise that resolves to an object with a string representing the date of the last activity and an array of activities.
   */
  async getActivities(accessToken: string): Promise<{ lastActivityOn: string, activities: GitLabActivity[] }> {
    let lastActivityOn
    try {
      const headers = { Authorization: `Bearer ${accessToken}` }
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_GITLAB_API_URL}/user`, { headers })
      lastActivityOn = userResponse.data.last_activity_on
    } catch (error: any) {
      console.error(error)
      throw new Error(`Failed to get last activity on: ${error.message}`)
    }

    try {
      const page1 = await this.getRecentActivities(accessToken, 100, 1)
      const page2 = await this.getRecentActivities(accessToken, 100, 2)

      let activities = [...page1, ...page2].slice(0, 101)

      return { lastActivityOn, activities }
    } catch (error: any) {
      console.error(error)
      throw new Error(`Failed to get activities: ${error.message}`)
    }
  }


  async getGroups(accessToken: string): Promise<Object> {
    try {
      const client = new ApolloClient({
        uri: 'https://gitlab.lnu.se/api/graphql',
        cache: new InMemoryCache(),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const query = gql`
        query {
          currentUser {
            groupCount
            groups(first: 3) {
              nodes {
                id
                name
                webUrl
                avatarUrl
                fullPath
                projects(includeSubgroups: true, first: 5) {
                  count
                  nodes {
                    id
                    name
                    webUrl
                    avatarUrl
                    fullPath
                    lastActivityAt
                    repository {
                      tree(ref: "HEAD") {
                        lastCommit {
                          authoredDate
                          author {
                            name
                            username
                            avatarUrl
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `

      const result = await client.query({ query })
      let groups = result.data.currentUser.groups.nodes
      const groupCount = result.data.currentUser.groupCount

      groups = await Promise.all(groups.map(async (group: any) => {
        const { id, name, webUrl, avatarUrl, fullPath } = group
        const { count } = group.projects

        const projects = await Promise.all(group.projects.nodes.map(async (project: any) => {
          const { id, name, webUrl, avatarUrl, fullPath, lastActivityAt, repository } = project

          let lastCommit = null
          if (repository && repository.tree && repository.tree.lastCommit) {
            const { author } = repository.tree.lastCommit
            const date = this.getTimeAgo(repository.tree.lastCommit.authoredDate)
            lastCommit = { author, date }
          }

          return { id, name, webUrl, avatarUrl, fullPath, lastActivityAt, lastCommit }
        }))
        return { id, name, webUrl, avatarUrl, fullPath, projects, projectCount: count }
      }))
      return { groups: groups as GitLabGroup[], groupCount }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get groups')
    }
  }

  getTimeAgo(timestamp: any) {
    const ONE_MINUTE = 60 * 1000 // milliseconds
    const ONE_HOUR = 60 * ONE_MINUTE
    const ONE_DAY = 24 * ONE_HOUR
    const ONE_MONTH = 30 * ONE_DAY
    const ONE_YEAR = 365 * ONE_DAY

    const now = new Date()
    const date = new Date(timestamp)
    const elapsed = now.getTime() - date.getTime()

    if (elapsed < ONE_MINUTE) {
      return "just now"
    } else if (elapsed < ONE_HOUR) {
      const minutes = Math.floor(elapsed / ONE_MINUTE)
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
    } else if (elapsed < ONE_DAY) {
      const hours = Math.floor(elapsed / ONE_HOUR)
      return `${hours} hour${hours === 1 ? "" : "s"} ago`
    } else if (elapsed < ONE_MONTH) {
      const days = Math.floor(elapsed / ONE_DAY)
      return `${days} day${days === 1 ? "" : "s"} ago`
    } else if (elapsed < ONE_YEAR) {
      const months = Math.floor(elapsed / ONE_MONTH)
      return `${months} month${months === 1 ? "" : "s"} ago`
    } else {
      const years = Math.floor(elapsed / ONE_YEAR)
      return `${years} year${years === 1 ? "" : "s"} ago`
    }
  }
}