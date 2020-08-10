import { success, notFound } from '../../services/response/'
import { YoutubeApi } from '.'

const OAuth2Data = require('../../../credentials.json')
const { google } = require('googleapis')

export const create = ({ body }, res, next) =>
  YoutubeApi.create(body)
    .then((youtubeApi) => youtubeApi.view(true))
    .then(success(res, 201))
    .catch(next)


export const indexCallback = ({ querymen: { query, select, cursor } }, res, next) => {
  new Promise(resolve => resolve('PAI TA ON'))
  .then(success(res))
  .catch(next)
}


export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  console.log('chegou')
  // new Promise((resolve, reject) => {
  //   resolve('callback')
  // })
  // .then(success(res))
  // .catch(next)

  let title, discription
  let tags = []

  // handle the authentication
  const CLIENT_ID = OAuth2Data.web.client_id
  const CLIENT_SECRET = OAuth2Data.web.client_secret
  const REDIRECT_URL = OAuth2Data.web.redirect_uris[0]

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  )

  let scopes = 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile'


  const authed = false
  if (!authed) {
    let url = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    })

    new Promise ((resolve, reject) => {
      resolve({url: url})
    })
    .then(success(res))
    .catch(next)
  }
}
  // YoutubeApi.find(query, select, cursor)
  //   .then((youtubeApis) => youtubeApis.map((youtubeApi) => youtubeApi.view()))
  //

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
