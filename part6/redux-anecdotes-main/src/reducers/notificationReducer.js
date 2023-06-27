import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, event) {
      return event.payload
    }
  }
})

export const { updateNotification } = notificationSlice.actions

export default notificationSlice.reducer