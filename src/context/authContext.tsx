import React, { FC, PropsWithChildren, useContext, useState } from 'react';

interface AuthContextType {
  isInitialized: boolean
  isAuthorized: boolean
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  return (
    <AuthContext.Provider value={{
      isAuthorized,
      isInitialized,
      setIsAuthorized,
      setIsInitialized,
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