import { IGitLabAPIService } from '../interfaces/IGitLabAPIService'
import { GitLabGroup, GitLabActivity } from '@/lib/types/types'

export class GitLabAPIController {
  private readonly gitLabAPIService: IGitLabAPIService

  constructor(gitLabAPIService: IGitLabAPIService) {
    this.gitLabAPIService = gitLabAPIService
  }

  async getRecentActivities(accessToken: string, per_page: number, page: number): Promise<GitLabActivity[]> {
    return await this.gitLabAPIService.getRecentActivities(accessToken, per_page, page)
  }

  async getActivities(accessToken: string): Promise<{ lastActivityOn: string, activities: GitLabActivity[] }> {
    return await this.gitLabAPIService.getActivities(accessToken)
  }

  async getGroups(accessToken: string): Promise<Object> {
    return await this.gitLabAPIService.getGroups(accessToken)
  }
}
