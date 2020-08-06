import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Video } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Video.create({ ...body, user })
    .then((video) => video.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Video.find(query, select, cursor)
    .populate('user')
    .then((videos) => videos.map((video) => video.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Video.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((video) => video ? video.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Video.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((video) => video ? Object.assign(video, body).save() : null)
    .then((video) => video ? video.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Video.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((video) => video ? video.remove() : null)
    .then(success(res, 204))
    .catch(next)
