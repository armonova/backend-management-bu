import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { YoutubeApi } from '.'

const app = () => express(apiRoot, routes)

let youtubeApi

beforeEach(async () => {
  youtubeApi = await YoutubeApi.create({})
})

test('POST /oauth2callback 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /oauth2callback 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /oauth2callback/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${youtubeApi.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(youtubeApi.id)
})

test('GET /oauth2callback/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /oauth2callback/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${youtubeApi.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(youtubeApi.id)
})

test('PUT /oauth2callback/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /oauth2callback/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${youtubeApi.id}`)
  expect(status).toBe(204)
})

test('DELETE /oauth2callback/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
