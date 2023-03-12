import styles from './Activities.module.css'
import { GitLabActivity } from '@/lib/types/types'


/**
 * Displays a list of recent activities.
 * @returns {JSX.Element} - The rendered component.
 */
const Activities: React.FC<{ activities: GitLabActivity[] }> = ({ activities }): JSX.Element => {
  return (
    <div className={styles.activityList}>
      {activities.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className={styles.activityCount}></th>
              <th className={styles.action}>Action</th>
              <th>Title</th>
              <th className={styles.date}>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity: any, index: number) => (
              <tr key={activity.id}>
                <td className={styles.activityCount}>{index + 1}</td>
                <td className={styles.activity}>{activity.action}</td>
                <td className={styles.title}> {activity.commit_title}</td>
                <td> {activity.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recent activities found</p>
      )}
    </div>
  )
}

export default Activities
