import { GitLabUser } from '../types/types'

/**
 * Service for authenticating with GitLab via OAuth2
 */
export interface IGitLabOAuthService {
  /**
   * Returns the URL to redirect the user to for authorization
   * @returns The authorization URL
   */
  getAuthorizationUrl(): string

  /**
   * Gets access and refresh tokens for the given authorization code
   * @param code - The authorization code to exchange for tokens
   * @param clientId - The client ID for the GitLab application
   * @param clientSecret - The client secret for the GitLab application
   * @param redirectUri - The redirect URI for the GitLab application
   * @returns An object containing the access token, refresh token, expiration time, and user information
   * @throws An error if there was a problem getting the tokens
   */
  getTokens(code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<{
    access_token: string,
    refresh_token: string,
    expiration: number,
    user: GitLabUser
  }>

  /**
   * Refreshes the access and refresh tokens with the given refresh token.
   * @param refreshToken - The refresh token to use to get new access and refresh tokens.
   * @returns An object containing the new access token, refresh token, and expiration timestamp.
   * @throws An error if there was a problem refreshing the tokens.
   */
  refreshTokens(refreshToken: string): Promise<{
    access_token: string,
    refresh_token: string,
    expiration: number
  }>
}
