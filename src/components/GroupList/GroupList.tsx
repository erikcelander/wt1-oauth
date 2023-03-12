import styles from './GroupList.module.css'
import type { GitLabGroup } from '@/lib/types/types'
import Group from '../Group/Group'

/**
 * Renders a list of GitLab groups.
 * 
 * @returns {JSX.Element} - The rendered component.
 */
const GroupList: React.FC<{ groups: GitLabGroup[], groupCount: number }> = ({ groups, groupCount }): JSX.Element => {
  return (
    <div className={styles.groupList}>
      <div className={styles.groupContainer}>

        {groups ? (
          groups.map((group: GitLabGroup) =>
            <Group key={group.id} group={group} />
          )
        ) : (
          <p>No groups found</p>
        )}
        {groupCount > 3 && (
         <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, fontSize:14 }}>
            <p>There are {groupCount - 3} more groups not being displayed</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default GroupList

