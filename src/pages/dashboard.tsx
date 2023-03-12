import { GitLabActivity, GitLabGroup, GitLabUser } from '@/lib/types/types'
import { useState } from 'react'
import { withSessionSsr } from '@/lib/config/withSession'
import styles from '../styles/Dashboard.module.css'
import { container } from '@/lib/config/bootstrap'
import UserProfile from '@/components/UserProfile/UserProfile'
import Tabs from '@/components/Tabs/Tabs'
import GroupList from '@/components/GroupList/GroupList'
import Activities from '@/components/Activities/Activities'
import LogoutButton from '@/components/LogoutButton/LogoutButton'


export default function Dashboard({ user, activities, groups, groupCount }: {
  user: GitLabUser
  activities: GitLabActivity[]
  groups: GitLabGroup[]
  groupCount: number
}) {
  
  const [activeTab, switchTab] = useState<string>('groups')

  return (

    <div className={styles.pageContainer}>
      <LogoutButton />
      <UserProfile user={user} />
      <div className={styles.contentContainer}>
        <Tabs activeTab={activeTab} switchTab={switchTab} />
        <div className={styles.content}>
          {activeTab === 'groups' && (
            <GroupList groups={groups} groupCount={groupCount} />
          )}

          {activeTab === 'activities' && (
            <Activities activities={activities} />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    try {
      const session = req.session as any
      const user = session.user as GitLabUser
      let { access_token } = session
      const { refresh_token, expiration } = session



      if (!session || !user) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }

      if (expiration - Date.now() < 5 * 60 * 1000) {
        const gitlabOAuthController = container.resolve('GitLabOAuthController')
        const tokens = await gitlabOAuthController.refreshTokens(refresh_token)
        session.access_token = tokens.access_token
        session.refresh_token = tokens.refresh_token
        session.expiration = tokens.expiration
        access_token = tokens.access_token
        await req.session.save()
      }

      const gitLabAPIController = container.resolve('GitLabAPIController')
      const { lastActivityOn, activities } = await gitLabAPIController.getActivities(access_token)
      const {groups, groupCount } = await gitLabAPIController.getGroups(access_token)

      user.lastActivityOn = lastActivityOn

      return {
        props: {
          user: user || null,
          activities: activities || null,
          groups: groups || null,
          groupCount: groupCount || null
        }
      }

    } catch (error) {

      console.error(error)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  }
)