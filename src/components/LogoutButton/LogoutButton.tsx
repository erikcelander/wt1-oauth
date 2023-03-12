import { useRouter } from 'next/router'
import styles from './LogoutButton.module.css'
import Link from 'next/link'

/**
 * A button component that logs the user out by making a POST request to the server-side logout API endpoint and redirecting the user to the home page.
 * 
 * @returns {JSX.Element} - The rendered component.
 */
function LogoutButton(): JSX.Element {
  const router = useRouter()

  /**
   * Handles the click event for the logout button by making a POST request to the server-side logout API endpoint and redirecting the user to the home page.
   */
  const handleLogout = () => {
    router.push('/')
    fetch("/api/gitlab/logout", { method: "POST" })
  }

  return (
    <button className={styles.logout} onClick={handleLogout}>Sign out</button>
  )
}

export default LogoutButton
