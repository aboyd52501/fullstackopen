
const Notification = ({ notification }) => {
  if (!notification) return null;

  const { color, message } = notification;

  const style = {
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    borderColor: color || 'blue',
    borderWidth: 2,
    borderStyle: "solid",
    background: 'lightGrey',
    marginBottom: 10,
    color: color || 'blue',
  };

  return (
    <div style={style}>
      <em>{message}</em>
    </div>
  );
}

export default Notification