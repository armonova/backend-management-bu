import { success, notFound } from '../../services/response/'
import { Instrument } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Instrument.create(body)
    .then((instrument) => instrument.view(true))
    .then(success(res, 201))
    .catch(next)

    // test deploy
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Instrument.find(query, select, cursor)
    .then((instruments) => instruments.map((instrument) => instrument.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Instrument.findById(params.id)
    .then(notFound(res))
    .then((instrument) => instrument ? instrument.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Instrument.findById(params.id)
    .then(notFound(res))
    .then((instrument) => instrument ? Object.assign(instrument, body).save() : null)
    .then((instrument) => instrument ? instrument.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Instrument.findById(params.id)
    .then(notFound(res))
    .then((instrument) => instrument ? instrument.remove() : null)
    .then(success(res, 204))
    .catch(next)
