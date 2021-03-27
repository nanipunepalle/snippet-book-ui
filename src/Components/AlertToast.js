import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertToast = (props) => {

    const { vertical, horizontal, open, message, type } = props.state;

    const handleClose = () => {
        props.setState({ ...props.state, open: false})
    };

    return <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        key={vertical + horizontal}
    >
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
    </Snackbar>
}

export default AlertToast;