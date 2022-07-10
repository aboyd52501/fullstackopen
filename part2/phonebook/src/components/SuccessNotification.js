const SuccessNotification = ({message}) => {

    if (message === null)
        return null;

    const successStyle = {
        color: "green",
        padding: 10,
        fontSize: 20,
        borderRadius: 5,
        borderColor: "green",
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

export default SuccessNotification