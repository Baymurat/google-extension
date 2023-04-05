import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { worker } from '../../../workers/worker.src'

interface AuthStore {
  isInitialized: boolean
  isAuthenticated: boolean
}

const initialState: AuthStore = {
  isInitialized: false,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
    setIsAuthenticated(state, action: PayloadAction<{ isAuthenticated: boolean }>) {
      state.isAuthenticated = action.payload.isAuthenticated
    },
    handleInitialize(state, action: PayloadAction<{ password: string }>) {
      const { password } = action.payload
      worker.postMessage({
        eventName: "initializeApp",
        payload: { password }
      })
    },
    handleAuthenticate(state, action: PayloadAction<{ password: string }>) {
      const { password } = action.payload
      worker.postMessage({
        eventName: "authenticate",
        payload: { password }
      })
    },
    handleFullReset(state) {
      state.isInitialized = false
      state.isAuthenticated = false
      worker.postMessage({
        eventName: "fullReset"
      })
    },
    handleLogout(state) {
      state.isAuthenticated = false
    }
  }
})

export const {
  setIsAuthenticated,
  setIsInitialized,
  handleInitialize,
  handleAuthenticate,
  handleFullReset,
  handleLogout,
} = authSlice.actions

export const isAuthenticatedSelector = (state: { authStore: AuthStore }) => state.authStore.isAuthenticated
export const isInitializedSelector = (state: { authStore: AuthStore }) => state.authStore.isInitialized

export default authSlice.reducer