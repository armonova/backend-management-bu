import { Instrument } from '.'

let instrument

beforeEach(async () => {
  instrument = await Instrument.create({ name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = instrument.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(instrument.id)
    expect(view.name).toBe(instrument.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = instrument.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(instrument.id)
    expect(view.name).toBe(instrument.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
