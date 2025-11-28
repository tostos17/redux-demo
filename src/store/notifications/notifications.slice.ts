import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { resetCountFromFakeApi } from '../../fakeApi'

export const resetCountViaApi = createAsyncThunk(
  'notifications/resetCountViaApi',
  async () => {
    try {
      const response = await resetCountFromFakeApi();
      return response.success;
    } catch(err) {
      alert((err as Error).message);
      throw new Error("")
    }
  },
)

// Define a type for the slice state
interface NotificationsState {
  count: number,
  resetStatus: "loading" | "error" | "idle"
}

// Define the initial state using that type
const initialState: NotificationsState = {
  count: 0,
  resetStatus: "idle"
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    reset: (state) => {
      state.count = 0
    },
    
  },
  extraReducers(builder) {
     builder.addCase(
      resetCountViaApi.pending,
      (state) => {
        state.resetStatus = "loading";
      }
     ).addCase(resetCountViaApi.fulfilled, (state) => {
      state.resetStatus = "idle";
      state.count = 0;
     })
     .addCase(resetCountViaApi.rejected, (state) => {state.resetStatus = "error"}) 
  },
})

export const { increment, reset } = notificationsSlice.actions


export default notificationsSlice.reducer