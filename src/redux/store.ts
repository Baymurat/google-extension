import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

import secretStateReducer, { setSecret, getSecret } from "./features/secret/secretSlice";
import authStateReducer, { setIsAuthenticated, setIsInitialized } from "./features/auth/authSlice";
import workerStateReducer, { workerEvent } from "./features/worker/workerSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: workerEvent,
  effect: async (action, listenerApi) => {
    const { actionName, payload } = action.payload

    if (actionName === 'init') {
      listenerApi.dispatch(getSecret())
    }

    if (actionName === 'initializeApp' || actionName === 'getSecret') {
      const { secret, isInitialized } = payload
      listenerApi.dispatch(setSecret({ secret }))
      listenerApi.dispatch(setIsInitialized({ isInitialized }))
    }

    if (actionName === 'regenerate') {
      const { secret } = payload
      listenerApi.dispatch(setSecret({ secret }))
    }

    if (actionName === 'fullReset') {
      listenerApi.dispatch(setIsInitialized({ isInitialized: false }))
      listenerApi.dispatch(setIsAuthenticated({ isAuthenticated: false }))
    }

    if (actionName === 'authenticate') {
      const { isAuthenticated } = payload
      listenerApi.dispatch(setIsAuthenticated({ isAuthenticated }))
    }
  }
})

export const store = configureStore({
  reducer: {
    secretStore: secretStateReducer,
    authStore: authStateReducer,
    worker: workerStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;