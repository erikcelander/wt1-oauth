import styles from './Group.module.css'
import Project from '../Project/Project'
import { GitLabGroup } from '@/lib/types/types'

/**
 * Renders information about a GitLab group, including its name, avatar, and projects.
 * 
 * @returns {JSX.Element} - The rendered component.
 */
const Group: React.FC<{ group: GitLabGroup }> = ({ group }): JSX.Element => {
  return (
    <div key={group.id} className={styles.group}>
      <div className={styles.groupInfo}>
        <h3>
          <a href={group.webUrl} className={styles.link}>
            {group.name}
          </a>
          {group.avatarUrl && (
            <img src={group.avatarUrl} style={{ height: '20px', marginLeft: '5px' }} />
          )}
        </h3>

        <p>{group.fullPath}</p>
      
      </div>
      <table className={styles.table}>

        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Projects</th>
            <th className={styles.th}>Last Commit</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {group.projects.map((project: any) => (
            <Project key={project.id} project={project} />
          ))}
        </tbody>

      </table>
      {group.projectCount > 5 && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, fontSize:14 }}>
          <p>There are {group.projectCount - 5} more projects not being displayed</p>
        </div>
      )}
    </div>
  )
}

export default Group
