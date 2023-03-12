import { container } from '@/lib/config/bootstrap'
import { withSessionRoute } from '@/lib/config/withSession'

/**
 * Handles the callback route for GitLab OAuth2 authentication flow.
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the function is done executing.
 */
async function callbackRoute(req: any, res: any): Promise<void> {
  try {
    const { code } = req.query
    const gitLabOAuthController = container.resolve('GitLabOAuthController')

    if (typeof code !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid GitLab authorization code' })
    }

    const { access_token, user, refresh_token, expiration } = await gitLabOAuthController
    .getTokens(code, process.env.GITLAB_CLIENT_ID, process.env.GITLAB_CLIENT_SECRET, process.env.NEXT_PUBLIC_REDIRECT_URI)

    req.session.access_token = access_token
    req.session.refresh_token = refresh_token
    req.session.expiration = expiration
    req.session.user = user

    await req.session.save()

    // Redirect to the root page
    return res.redirect('/dashboard')
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default withSessionRoute(callbackRoute)
