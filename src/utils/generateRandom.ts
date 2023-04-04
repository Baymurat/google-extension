const ABC = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWYZ'
const abcLength = ABC.length

export const generateRandomString = (length: number = 10): string => {
  let result = ''

  for (let i = 0; i <= length; i++) {
    const nextIndex = Math.round(Math.random() * abcLength)
    result += ABC[nextIndex]
  }
  return result
}