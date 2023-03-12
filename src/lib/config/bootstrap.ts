/**
 * Module for bootstrapping.
 */

import { IoCContainer } from '../ioc/IoCContainer'
import { GitLabAPIService } from '../services/GitLabAPIService'
import { GitLabAPIController } from '../controllers/GitLabAPIController'
import { GitLabOAuthService } from '../services/GitLabOAuthService'
import { GitLabOAuthController } from '../controllers/GitLabOAuthController'


const iocContainer = new IoCContainer()

iocContainer.register('GitLabOAuthService', GitLabOAuthService, {
  singleton: true
})

iocContainer.register('GitLabOAuthController', GitLabOAuthController, {
  dependencies: ['GitLabOAuthService'],
  singleton: true
})

iocContainer.register('GitLabAPIService', GitLabAPIService, {
  singleton: true
})


iocContainer.register('GitLabAPIController', GitLabAPIController, {
  dependencies: [
    'GitLabAPIService'
  ],
  singleton: true
})

export const container = Object.freeze(iocContainer)