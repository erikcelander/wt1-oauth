import { GitLabGroup, GitLabActivity } from "../types/types"

/**
 * Interface for a GitLab API service.
 * 
 * @interface
 */
export interface IGitLabAPIService {
  /**
   * Gets recent activities.
   * 
   * @param {string} accessToken - The GitLab access token.
   * @param {number} per_page - Number of activities per page.
   * @param {number} page - The page number.
   * @returns {Promise<GitLabActivity[]>} The recent activities.
   */
  getRecentActivities(accessToken: string, per_page: number, page: number): Promise<GitLabActivity[]>

  /**
   * Gets all activities.
   * 
   * @param {string} accessToken - The GitLab access token.
   * @returns {Promise<GitLabActivity[]>} All activities.
   */
  getActivities(accessToken: string): Promise<{ lastActivityOn: string, activities: GitLabActivity[] }> 

  /**
   * Gets all groups.
   * 
   * @param {string} accessToken - The GitLab access token.
   * @returns {Promise<GitLabGroup[]>} All groups.
   */
  getGroups(accessToken: string): Promise<Object>
}
