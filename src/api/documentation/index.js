import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index } from './controller'

const router = new Router()

/**
 * @api {get} /documentations Retrieve documentations
 * @apiName RetrieveDocumentations
 * @apiGroup Documentation
 * @apiUse listParams
 * @apiSuccess {Object[]} documentations List of documentations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

export default router
