import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Instrument, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /instruments Create instrument
 * @apiName CreateInstrument
 * @apiGroup Instrument
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Instrument's name.
 * @apiSuccess {Object} instrument Instrument's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Instrument not found.
 * @apiError 401 master access only.
 */
router.post('/',
  // master(),
  body({ name }),
  create)

/**
 * @api {get} /instruments Retrieve instruments
 * @apiName RetrieveInstruments
 * @apiGroup Instrument
 * @apiUse listParams
 * @apiSuccess {Object[]} instruments List of instruments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /instruments/:id Retrieve instrument
 * @apiName RetrieveInstrument
 * @apiGroup Instrument
 * @apiSuccess {Object} instrument Instrument's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Instrument not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /instruments/:id Update instrument
 * @apiName UpdateInstrument
 * @apiGroup Instrument
 * @apiParam name Instrument's name.
 * @apiSuccess {Object} instrument Instrument's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Instrument not found.
 */
router.put('/:id',
  body({ name }),
  update)

/**
 * @api {delete} /instruments/:id Delete instrument
 * @apiName DeleteInstrument
 * @apiGroup Instrument
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Instrument not found.
 */
router.delete('/:id',
  destroy)

export default router
