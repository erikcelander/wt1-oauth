import { withSessionRoute } from '@/lib/config/withSession'

export default withSessionRoute(logoutRoute)

/**
* Route handler for logging out and destroying the session.
* @param {Object} req - The request object.
* @param {Object} res - The response object.
*/
async function logoutRoute(req: any, res: any) {
  req.session.destroy()
  return res.redirect('/')
}


