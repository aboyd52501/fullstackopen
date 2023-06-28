import { addNotification, removeNotification, setSpooling } from '../reducers/notificationReducer'

const next = store => {
  const count = store.getState().notification.notifications.length
  store.dispatch(removeNotification())
  if(count > 1) {
    setTimeout(() => next(store), 5000)
    return
  }
  store.dispatch(setSpooling(false))
}

const queueNotification = (notif, store) => {
  const spooling = store.getState().notification.spooling
  store.dispatch(addNotification(notif))
  if (!spooling) {
    store.dispatch(setSpooling(true))
    setTimeout(() => next(store), 5000)
  }
}

export default queueNotification