import { ActionCreatorWithoutPayload, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { worker } from "../../../workers/worker.src";

interface SecretStore {
  secret: string,
}

const initialState: SecretStore = {
  secret: 'initialSecret',
}

const secretSlice = createSlice({
  name: "secret",
  initialState,
  reducers: {
    setSecret(state, action: PayloadAction<{ secret: string }>) {
      state.secret = action.payload.secret
    },
    regenerateSecret(state) {
      worker.postMessage({ eventName: 'regenerate' })
    }
  }
})

export const { setSecret } = secretSlice.actions
export const regenerateSecret = secretSlice.actions.regenerateSecret as ActionCreatorWithoutPayload

export const secretSelector = (state: { secretStore: SecretStore }) => state.secretStore.secret

export default secretSlice.reducer