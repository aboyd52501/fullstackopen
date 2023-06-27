import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)

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
    <div style={notification.length > 0 ? displayStyle : noDisplayStyle}>
      Notification!: {notification}
    </div>
  )
}

export default Notification