import { isValidname, isExternal } from '@/utils/validate'

describe('Utils:validate', () => {
  it('isValidname', () => {
    expect(isValidname('admin')).toBe(true)
    expect(isValidname('editor')).toBe(true)
    expect(isValidname('xxxx')).toBe(false)
  })

  it('isExternal', () => {
    expect(isExternal('https://www.armour.com/')).toBe(true)
    expect(isExternal('mailto:someone@test.com')).toBe(true)
    expect(isExternal('123aBC')).toBe(false)
  })
})
