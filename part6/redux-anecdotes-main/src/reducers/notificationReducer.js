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

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const selectNotificationState = state => state.notification

// Notifs = [['notif1', 1000], ['notif2', 1500], ...]
// A list of queued up notifications.
// A notification is a tuple of [display_content, display_time_ms]
const doSpooling = () => async (dispatch, getState) => {
  const getNotifications = () => getState().notification.notifications
  let currentNotifs = getNotifications()
  while (currentNotifs.length) {
    await delay(currentNotifs[0][1])
    dispatch(removeNotification())
    currentNotifs = getNotifications()
  }
  dispatch(setSpooling(false))
}

export const queueNotification = (content, duration) => (dispatch, getState) => {
  dispatch(addNotification([content, duration]))
  const state = selectNotificationState(getState())
  console.log(state)
  if (!state.spooling) {
    dispatch(setSpooling(true))
    dispatch(doSpooling())
  }
}


export default notificationSlice.reducer