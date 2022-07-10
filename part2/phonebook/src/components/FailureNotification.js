const FailureNotification = ({message}) => {

    if (message === null)
        return null;

    const successStyle = {
        color: "red",
        padding: 10,
        fontSize: 20,
        borderRadius: 5,
        borderColor: "red",
        borderWidth: 2,
        borderStyle: "solid",
        background: 'lightGrey',
        marginBottom: 10,
    };

    return (
        <div style={successStyle}>
            <em>{message}</em>
        </div>
    );
}

export default FailureNotification