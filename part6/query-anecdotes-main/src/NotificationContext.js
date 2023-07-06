import { createContext, useReducer } from 'react'

// action: {type: String, payload: String}
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "REMOVE":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext(['', ()=>{}])

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const sendNotification = (content, dispatch) => {
  dispatch({type: 'SET', payload: content})
  setTimeout(() => dispatch({type: 'REMOVE'}), 5000) 
}

export default NotificationContext