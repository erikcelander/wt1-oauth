import styles from './Project.module.css'
import type { GitLabProject } from '@/lib/types/types'

/**
 * Renders information about a GitLab project, including its name, avatar, and last commit.
 * 
 * @returns {JSX.Element} - The rendered component.
 */
const Project: React.FC<{ project: GitLabProject }> = ({ project }): JSX.Element => {
  return (
    <tr key={project.id}>
      <td className={styles.td}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h4>
              <a href={project.webUrl} className={styles.link}>
                {project.name}
              </a>
            </h4>
            {project.avatarUrl && (
              <img src={project.avatarUrl} style={{ height: '20px', marginLeft: '5px' }} />
            )}
          </div>

          <p>{project.fullPath}</p>
        </div>
      </td>
      <td className={styles.td}>
        {project.lastCommit ? (
          <div style={{ display: 'flex', alignItems: 'center', fontSize:14 }}>
            {`${project.lastCommit.date} by ${project.lastCommit.author.name} (${project.lastCommit.author.username})`}
            {project.lastCommit.author.avatarUrl.startsWith('https://secure.gravatar.com') && (
              <img
                src={project.lastCommit.author.avatarUrl} className={styles.commitAvatar}
                style={{ height: '20px', marginLeft: '5px' }}
              />
            )}
          </div>
        ) : (
          <p>No commits found</p>
        )}
      </td>
    </tr>
  )
}

export default Project
