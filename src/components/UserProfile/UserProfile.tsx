import styles from './UserProfile.module.css'
import { GitLabUser } from '@/lib/types/types'

/**
 * A component that displays the user profile information
 * 
 * @returns {JSX.Element} - The rendered component
 */
const UserProfile: React.FC<{ user: GitLabUser }> = ({ user }): JSX.Element => {
  return (
    <div className={styles.profile}>
      <h2 className={styles.name}>{user.name}</h2>

      <div className={styles.userContainer}>
        <div className={styles.userInfo}>
          <p>
            <span>Username:</span> {user.username}
          </p>
          <p>
            <span>Email:</span> {user.email}
          </p>
          <p>
            <span>Profile:</span>{' '}
            <a href={user.profile} className={styles.link}>
              {user.profile}
            </a>
          </p>
          <p>
            <span>Last activity on:</span> {user.lastActivityOn}
          </p>
          <p>
            <span>ID:</span> {user.id}
          </p>
        </div>
        <img src={user.picture} alt="Profile picture" className={styles.picture} />
      </div>
    </div>
  )
}

export default UserProfile

