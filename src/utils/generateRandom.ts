import crypto from 'crypto-js'

const ABC = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWYZ'
const abcLength = ABC.length
const secret = 'some-long-secret-key'

export const generateRandomString = (length: number = 10): string => {
  let result = ''

  for (let i = 0; i <= length; i++) {
    const nextIndex = Math.round(Math.random() * abcLength)
    result += ABC[nextIndex]
  }
  return result
}

export const encrypt = (target: string): string => {
  return crypto.AES.encrypt(target, secret).toString()
}

export const decrypt = (ciphertext: string): string => {
  const bytes = crypto.AES.decrypt(ciphertext, secret)
  return bytes.toString(crypto.enc.Utf8)
}