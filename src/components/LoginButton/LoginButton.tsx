import { FaGitlab } from "react-icons/fa"
import styles from './LoginButton.module.css'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
const inter = Inter({ subsets: ['latin'] })

/**
 * A button component that logs the user in via GitLab OAuth.
 * 
 * @returns {JSX.Element} - The rendered component.
 */
const LoginButton: React.FC<{ url: string }> = ({ url }): JSX.Element => {
  const router = useRouter()
  /**
   * Handles the click event for the login button by redirecting the user to the specified URL.
   */
  const login = async () => {
    router.push(url)
  }

  return (
    <div className={styles.center}>
      <button className={styles['gitlab-button']} onClick={login}>
        <div className={styles.logo}>
          <FaGitlab size={24} />
        </div>
        <h4 className={inter.className}>Sign in with GitLab</h4>
      </button>
    </div>
  )
}

export default LoginButton
