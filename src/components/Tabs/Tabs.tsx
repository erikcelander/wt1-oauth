import styles from './Tabs.module.css';

/**
 * Renders a set of tabs for switching between groups and recent activities.
 *
 * @param {Object} props - The component props.
 * @param {string} props.activeTab - The currently active tab.
 * @param {Function} props.switchTab - The function to call when switching tabs.
 * @returns {JSX.Element} The rendered component.
 */
export default function Tabs({ activeTab, switchTab }: any): JSX.Element {
  return (
    <div className={styles.tabs}>
      <button
        className={
          activeTab === 'groups' ? `${styles.tab} ${styles.activeTab}` : styles.tab
        }
        onClick={() => switchTab('groups')}
      >
        Groups
      </button>
      <button
        className={
          activeTab === 'activities'
            ? `${styles.tab} ${styles.activeTab}`
            : styles.tab
        }
        onClick={() => switchTab('activities')}
      >
        Recent Activities
      </button>
    </div>
  );
}
