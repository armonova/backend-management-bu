import { Video } from '.'
import { User } from '../user'

let user, video

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  video = await Video.create({ user, intrument: 'test', year: 'test', championship: 'test', link: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = video.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(video.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.intrument).toBe(video.intrument)
    expect(view.year).toBe(video.year)
    expect(view.championship).toBe(video.championship)
    expect(view.link).toBe(video.link)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = video.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(video.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.intrument).toBe(video.intrument)
    expect(view.year).toBe(video.year)
    expect(view.championship).toBe(video.championship)
    expect(view.link).toBe(video.link)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
