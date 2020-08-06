import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Instrument } from '.'

const app = () => express(apiRoot, routes)

let instrument

beforeEach(async () => {
  instrument = await Instrument.create({})
})

test('POST /instruments 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
})

test('POST /instruments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /instruments 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /instruments/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${instrument.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(instrument.id)
})

test('GET /instruments/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /instruments/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${instrument.id}`)
    .send({ name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(instrument.id)
  expect(body.name).toEqual('test')
})

test('PUT /instruments/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /instruments/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${instrument.id}`)
  expect(status).toBe(204)
})

test('DELETE /instruments/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
