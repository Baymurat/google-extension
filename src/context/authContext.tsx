import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import bcrypt from 'bcryptjs'

import { generateRandomString } from '../utils/generateRandom';

const salt = bcrypt.genSaltSync(10)

interface AuthContextType {
  isInitialized: boolean
  isAuthorized: boolean
  setAuthorizedState: (state: string | null) => Promise<boolean>
  setInitializedState: (state: string | null) => Promise<boolean>
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const setAuthorizedState = (password: string | null): Promise<boolean> => {
    if (password === null) {
      return Promise.reject()
    }

    const passwordHash = localStorage.getItem("passwordHash")

    if (passwordHash === null) {
      localStorage.removeItem("passwordHash")
      localStorage.removeItem("randomString")
      setIsInitialized(false)
      setIsAuthorized(false)

      return Promise.reject()
    }

    return new Promise((resolve, reject) => {
      const isCorrect = bcrypt.compareSync(password, passwordHash)
      if (isCorrect) {
        setIsAuthorized(true)
        resolve(true)
      } else {
        reject()
      }
    })
  }

  const setInitializedState = (password: string | null): Promise<boolean> => {
    if (password === null) {
      localStorage.removeItem("passwordHash")
      localStorage.removeItem("randomString")
      setIsInitialized(false)
      setIsAuthorized(false)

      return Promise.resolve(true)
    }

    if (password === '') {
      return Promise.reject()
    }

    const randomString = generateRandomString()
    const passwordHash = bcrypt.hashSync(password, salt)
    localStorage.setItem('passwordHash', passwordHash)
    localStorage.setItem("randomString", randomString)

    setIsInitialized(true)

    return Promise.resolve(true)
  }

  return (
    <AuthContext.Provider value={{
      isAuthorized,
      isInitialized,
      setAuthorizedState,
      setInitializedState,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error(
      'useAuthContext has to be used within <AuthContext.Provider>'
    )
  }

  return context
}