import { YoutubeApi } from '.'

let youtubeApi

beforeEach(async () => {
  youtubeApi = await YoutubeApi.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = youtubeApi.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(youtubeApi.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = youtubeApi.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(youtubeApi.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
