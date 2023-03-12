import styles from '../styles/Home.module.css'
import LoginButton from '../components/LoginButton/LoginButton'
import { withSessionSsr } from '@/lib/config/withSession'
import { GitLabUser } from '@/lib/types/types'
import { container } from '@/lib/config/bootstrap'

export default function Home({ url }: { url: string }) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.center}>
          <LoginButton url={url} />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  try {
    const session = req?.session as any
    const user = session?.user as GitLabUser

    if (session && user) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }

    const gitlabOAuthController = container.resolve('GitLabOAuthController')
    const url = await gitlabOAuthController.getAuthorizationUrl()

    return {
      props: {
        url
      }
    }
  
  } catch (error) {

    console.error('An error occurred while retrieving the authorization URL.')
    return {
      props: {
        url: ''
      }
    }
  }
})




