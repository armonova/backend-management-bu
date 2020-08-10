import { success, notFound } from '../../services/response/'
import { YoutubeApi } from '.'

export const create = ({ body }, res, next) =>
  YoutubeApi.create(body)
    .then((youtubeApi) => youtubeApi.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  YoutubeApi.find(query, select, cursor)
    .then((youtubeApis) => youtubeApis.map((youtubeApi) => youtubeApi.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  YoutubeApi.findById(params.id)
    .then(notFound(res))
    .then((youtubeApi) => youtubeApi ? youtubeApi.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  YoutubeApi.findById(params.id)
    .then(notFound(res))
    .then((youtubeApi) => youtubeApi ? Object.assign(youtubeApi, body).save() : null)
    .then((youtubeApi) => youtubeApi ? youtubeApi.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  YoutubeApi.findById(params.id)
    .then(notFound(res))
    .then((youtubeApi) => youtubeApi ? youtubeApi.remove() : null)
    .then(success(res, 204))
    .catch(next)
