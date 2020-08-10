import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy, indexCallback } from './controller'
export YoutubeApi, { schema } from './model'

const router = new Router()

/**
 * @api {post} /oauth2callback Create youtube api
 * @apiName CreateYoutubeApi
 * @apiGroup YoutubeApi
 * @apiSuccess {Object} youtubeApi Youtube api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Youtube api not found.
 */
router.post('/',
  create)

/**
 * @api {get} /oauth2callback Retrieve youtube apis
 * @apiName RetrieveYoutubeApis
 * @apiGroup YoutubeApi
 * @apiUse listParams
 * @apiSuccess {Object[]} youtubeApis List of youtube apis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

router.get('/callback',
  query(),
  indexCallback)

/**
 * @api {get} /oauth2callback/:id Retrieve youtube api
 * @apiName RetrieveYoutubeApi
 * @apiGroup YoutubeApi
 * @apiSuccess {Object} youtubeApi Youtube api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Youtube api not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /oauth2callback/:id Update youtube api
 * @apiName UpdateYoutubeApi
 * @apiGroup YoutubeApi
 * @apiSuccess {Object} youtubeApi Youtube api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Youtube api not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /oauth2callback/:id Delete youtube api
 * @apiName DeleteYoutubeApi
 * @apiGroup YoutubeApi
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Youtube api not found.
 */
router.delete('/:id',
  destroy)

export default router
