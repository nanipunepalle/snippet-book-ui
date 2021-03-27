import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import AuthContext from '../AuthContext';
import ApiService from '../Apis/apiservice';
import AlertToast from '../Components/AlertToast';

const useStyles = makeStyles((theme) => ({
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0.5),
    },
}));

export default function SignupDialog(props) {

    const classes = useStyles();
    const { setCurrentUser } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error'
    });

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        const { email, fullName, password } = e.target.elements;
        var data = new FormData()
        const payload = {
            email: email.value,
            password: password.value,
            name: fullName.value
        };
        data = JSON.stringify(payload);
        ApiService.signup(data, (response, success) => {
            if (success) {
                if (response.status === 200) {
                    response.json().then(value => {
                        localStorage.setItem('token', value.token);
                        setCurrentUser(value.user);
                        setLoading(false);
                        setState({
                            ...state,
                            open: true,
                            message: "Signup Successful",
                            type: "success",
                        })
                        props.setOpen(false);
                    })
                }
                else if (response.status === 202) {
                    setLoading(false);
                    setState({
                        ...state,
                        open: true,
                        message: "User already exists, Please signin",
                        type: "error",
                    })
                }
                else {
                    //alert something went wrong
                    setLoading(false);
                    setState({
                        ...state,
                        open: true,
                        message: "Something went wrong try again",
                        type: "error",
                    })
                }
            }
        })
    }

    // const handleSigninInsteadClick = () => {
    //     // props.setOpen(false);
    //     // setSigninDialohOpen(true);
    // }

    return (
        <div>
            <AlertToast state={state} setState={setState}></AlertToast>
            <Dialog open={props.open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Box display="flex" justifyContent="center">Signup</Box>
                    <div className={classes.icons}>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </div>
                </DialogTitle>
                <form onSubmit={handleSignup} style={{ padding: "20px", paddingTop: "0px" }}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="fullName"
                            label="Full Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            required
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            required
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button fullWidth variant="contained" type="submit" color="primary" disabled={loading}>
                            {loading ? <CircularProgress color="primary" size={24} /> : "Sign Up"}
                        </Button>
                    </DialogActions>
                    {/* <Box display="flex">
                        <Box>
                            <Button onClick={handleSigninInsteadClick}>Already User? Signin</Button>
                        </Box>
                    </Box> */}
                </form>
            </Dialog>
        </div>
    );
}