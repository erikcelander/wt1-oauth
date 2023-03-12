import axios, { AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken'
import { GitLabUser } from '../types/types'

/**
 * Service for authenticating with GitLab via OAuth2
 */
export class GitLabOAuthService {
  /**
   * Returns the URL to redirect the user to for authorization
   * @returns {string} The authorization URL
   */
  public getAuthorizationUrl(): string {
    return `${process.env.NEXT_PUBLIC_GITLAB_URL}/oauth/authorize?client_id=${process.env.GITLAB_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=read_user+read_api+openid+profile+email+read_repository`
  }

  /**
   * Gets access and refresh tokens for the given authorization code
   * @param {string} code The authorization code to exchange for tokens
   * @param {string} clientId The client ID for the GitLab application
   * @param {string} clientSecret The client secret for the GitLab application
   * @param {string} redirectUri The redirect URI for the GitLab application
   * @returns {Promise<{access_token: string, refresh_token: string, expiration: number, user: GitLabUser}>} The access token, refresh token, expiration time, and user information
   */
  public async getTokens(
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string,
  ): Promise<{
    access_token: string,
    refresh_token: string,
    expiration: number,
    user: GitLabUser
  }> {


    try {
      const {
        data: {
          access_token,
          id_token,
          refresh_token,
          expires_in
        }
      }: AxiosResponse<{
        access_token: string,
        id_token: string,
        refresh_token: string,
        expires_in: number
      }> = await axios.post(`${process.env.NEXT_PUBLIC_GITLAB_URL}/oauth/token`, {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      })


      const expiration = Date.now() + (expires_in * 1000)

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_GITLAB_URL}/oauth/userinfo`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })

      const { name, nickname, profile, picture } = data

      const { payload } = jwt.decode(id_token, { complete: true }) as any

      return {
        access_token,
        refresh_token,
        expiration: expiration,
        user: {
          id: payload.sub,
          name: name,
          username: nickname,
          email: payload.email,
          profile: profile,
          picture: picture,
        }
      }
    } catch (error: any) {
      console.error('Error getting tokens:', error)
      throw new Error('Failed to get tokens')
    }
  }

  /**
   * Refreshes the access and refresh tokens with the given refresh token.
   *
   * @param refreshToken - The refresh token to use to get new access and refresh tokens.
   *
   * @returns An object containing the new access token, refresh token, and expiration timestamp.
   *
   * @throws An error if there was a problem refreshing the tokens.
   */
  public async refreshTokens(refreshToken: string): Promise<{ access_token: string, refresh_token: string, expiration: number }> {
    try {
      const { data: { access_token, expires_in, refresh_token } } = await axios.post(`${process.env.NEXT_PUBLIC_GITLAB_URL}/oauth/token`, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.GITLAB_CLIENT_ID,
        client_secret: process.env.GITLAB_CLIENT_SECRET,
      })

      const expiration = Date.now() + (expires_in as number * 1000)

      return { access_token, refresh_token, expiration }
    } catch (error) {
      console.error('Error refreshing tokens:', error)
      throw new Error('Failed to refresh tokens')
    }
  }

}

