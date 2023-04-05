import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const workerSlice = createSlice({
  name: "worker",
  initialState: {},
  reducers: {
    workerEvent(state, action: PayloadAction<{ actionName: string, payload: any }>) {
      // simple indicator for listener
    }
  }
})

export const { workerEvent } = workerSlice.actions

export default workerSlice.reducer