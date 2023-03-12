import { GitLabOAuthService } from '../services/GitLabOAuthService';
import { GitLabUser } from '../types/types'

/**
 * Controller for GitLab OAuth
 */
export class GitLabOAuthController {
  private readonly gitLabOAuthService: GitLabOAuthService;

  /**
   * Creates a new instance of the GitLabOAuthController
   * 
   * @param gitLabOAuthService The service used to interact with the GitLab API
   */
  constructor(gitLabOAuthService: GitLabOAuthService) {
    this.gitLabOAuthService = gitLabOAuthService;
  }

  /**
   * Returns the authorization URL for GitLab OAuth
   * @returns {Promise<string>} The authorization URL
   */
  public getAuthorizationUrl(): string {
    return this.gitLabOAuthService.getAuthorizationUrl();
  }

  /**
   * Gets access and refresh tokens for the given authorization code
   * 
   * @param {string} code The authorization code to exchange for tokens
   * @param {string} clientId The client ID for the GitLab application
   * @param {string} clientSecret The client secret for the GitLab application
   * @param {string} redirectUri The redirect URI for the GitLab application
   * @returns {Promise<{access_token: string, refresh_token: string, expiration: number, user: GitLabUser}>} The access token, refresh token, expiration time, and user information
   */
  public async getTokens(code: string, clientId: string, clientSecret: string, redirectUri: string)
  : Promise<{access_token: string, refresh_token: string, expiration: number, user: GitLabUser}> {
    return await this.gitLabOAuthService.getTokens(code, clientId, clientSecret, redirectUri);
  }

  /**
   * Refreshes the access and refresh tokens with the given refresh token.
   *
   * @param refreshToken - The refresh token to use to get new access and refresh tokens.
   * @returns An object containing the new access token, refresh token, and expiration timestamp.
   * @throws An error if there was a problem refreshing the tokens.
   */
  public async refreshTokens(refreshToken: string): Promise<{ access_token: string, refresh_token: string, expiration: number }> {
    return await this.gitLabOAuthService.refreshTokens(refreshToken);
  }
}
