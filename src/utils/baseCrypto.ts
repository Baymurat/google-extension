import crypto from 'crypto-js'

const secret = 'some-long-secret-key'

export const encrypt = (target: string): string => {
  return crypto.AES.encrypt(target, secret).toString()
}

export const decrypt = (ciphertext: string): string => {
  const bytes = crypto.AES.decrypt(ciphertext, secret)
  return bytes.toString(crypto.enc.Utf8)
}