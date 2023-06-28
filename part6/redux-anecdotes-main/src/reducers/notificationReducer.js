import { createSlice } from '@reduxjs/toolkit'

const initialState = {notifications: [], spooling: false}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, event) {
      state.notifications.push(event.payload)
    },
    removeNotification(state, event) {
      state.notifications.shift()
    },
    setSpooling(state, event) {
      state.spooling = !!event.payload
    }
  }
})

export const {
  addNotification,
  removeNotification,
  setSpooling
} = notificationSlice.actions

export default notificationSlice.reducer