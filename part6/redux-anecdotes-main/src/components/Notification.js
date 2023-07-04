import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification.notifications[0] || '')

  const displayStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const noDisplayStyle = {
    ...displayStyle,
    display: 'none'
  }

  return (
    <div style={notification ? displayStyle : noDisplayStyle}>
      Notification: {notification[0]}
    </div>
  )
}

export default Notification