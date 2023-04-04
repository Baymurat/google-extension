import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { generateRandomString } from '../utils/generateRandom';

interface AuthContextType {
  isInitialized: boolean
  isAuthorized: boolean
  setAuthorizedState: (state: boolean) => void
  setInitializedState: (state: boolean) => void
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const setAuthorizedState = (state: boolean) => {
    setIsInitialized(state)
  }

  const setInitializedState = (state: boolean) => {
    if (state) {
      const randomString = generateRandomString()
      localStorage.setItem("randomString", randomString)
      setIsInitialized(true)
    } else {
      localStorage.removeItem("randomString")
      setIsInitialized(false)
      setIsAuthorized(false)
    }
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