/* eslint-disable no-restricted-globals */
import bcrypt from 'bcryptjs'

import { generateRandomString } from "../utils/generateRandom";
import { encrypt, decrypt } from '../utils/baseCrypto'

interface EventType {
  eventName: string
  payload: any
}

const salt = bcrypt.genSaltSync(10)
const DB_NAME = "store"
const TABLE_NAME = "secretTable"
const PASSWORD_KEY = "passwordHash"
const SECRET_KEY = "secret"

let db: IDBDatabase
const req = indexedDB.open(DB_NAME, 1)
req.onupgradeneeded = (e) => {
  console.log('UPGRADE');
  db = req.result
  db.createObjectStore(TABLE_NAME)
}

req.onsuccess = () => {
  console.log('SUCCESS');
  db = req.result
}

req.onerror = (e) => {
  console.log('ERROR', e);
}

req.onblocked = () => {
  console.log('BLOCKED');
}

self.onmessage = (e: MessageEvent<EventType>) => {

  const { eventName, payload } = e.data

  if (eventName === 'initializeApp') {
    const secret = generateRandomString()
    const encrypted = encrypt(secret)
    const passwordHash = bcrypt.hashSync(payload.password, salt)

    db.transaction(TABLE_NAME, "readwrite").objectStore(TABLE_NAME).put(passwordHash, PASSWORD_KEY)
    const putRequest = db.transaction(TABLE_NAME, "readwrite").objectStore(TABLE_NAME).put(encrypted, SECRET_KEY)
    putRequest.onsuccess = () => {
      const response = {
        actionName: "initializeApp",
        payload: { secret, isInitialized: true }
      }
      self.postMessage(response);
    }
  }

  if (eventName === 'getSecret') {
    const getRequest = db.transaction(TABLE_NAME, "readonly").objectStore(TABLE_NAME).get(SECRET_KEY)
    const response = {
      actionName: "getSecret",
      payload: {
        secret: "",
        isInitialized: false
      }
    }

    getRequest.onsuccess = () => {
      response.payload.secret = decrypt(getRequest.result)
      response.payload.isInitialized = true
      self.postMessage(response);
    }

    getRequest.onerror = () => {
      self.postMessage(response);
    }
  }

  if (eventName === 'regenerate') {
    const secret = generateRandomString()
    const encrypted = encrypt(secret)

    const putRequest = db.transaction(TABLE_NAME, "readwrite").objectStore(TABLE_NAME).put(encrypted, SECRET_KEY)

    putRequest.onsuccess = () => {
      const response = {
        actionName: "regenerate",
        payload: { secret, encrypted }
      }
      self.postMessage(response);
    }
  }

  if (eventName === 'authenticate') {
    const getRequest = db.transaction(TABLE_NAME, "readonly").objectStore(TABLE_NAME).get("passwordHash")
    const response = {
      actionName: "authenticate",
      payload: { isAuthenticated: false }
    }
    getRequest.onsuccess = () => {
      const isCorrect = bcrypt.compareSync(payload.password, getRequest.result)
      if (isCorrect) {
        response.payload.isAuthenticated = true
      }
      self.postMessage(response)
    }

    getRequest.onerror = () => {
      self.postMessage(response)
    }
  }
};

export { }