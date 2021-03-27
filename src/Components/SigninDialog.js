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
import SignupDialog from './SignupDialog';
import ApiService from '../Apis/apiservice';
import AlertToast from '../Components/AlertToast';


const useStyles = makeStyles((theme) => ({
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0.5),
    },
}));

export default function SigninDialog(props) {

    const classes = useStyles();
    const { setCurrentUser } = React.useContext(AuthContext);
    const [signupDialohOpen, setSignupDialogOpen] = React.useState(false);
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

    const handleSignin = (e) => {
        e.preventDefault();
        setLoading(true);
        const { email, password } = e.target.elements;
        var data = new FormData()
        const payload = {
            email: email.value,
            password: password.value,
        };
        data = JSON.stringify(payload);
        ApiService.signin(data, (response, success) => {
            if (success) {
                if (response.status === 200) {
                    response.json().then(value => {
                        localStorage.setItem('token', value.token);
                        setCurrentUser(value.user);
                        setLoading(false);
                        setState({
                            ...state,
                            open: true,
                            message: "Signin Successful",
                            type: "success",
                        })
                        props.setOpen(false);
                    })
                }
                else if (response.status === 201) {
                    setLoading(false);
                    setState({
                        ...state,
                        open: true,
                        message: "Invalid Credentials",
                        type: "error",
                    })
                }
                else if (response.status === 202) {
                    setLoading(false);
                    setState({
                        ...state,
                        open: true,
                        message: "User not found, Please signup",
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

    const handleSignupClick = () => {
        props.setOpen(false);
        setSignupDialogOpen(true);
    }

    return (
        <div>
            <AlertToast state={state} setState={setState}></AlertToast>
            <Dialog open={props.open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="signup-dialog">
                <DialogTitle id="signup-dialog-title">
                    <Box display="flex" justifyContent="center">Signin</Box>
                    <div className={classes.icons}>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </div>
                </DialogTitle>
                <form onSubmit={handleSignin} style={{ padding: "20px", paddingTop: "0px" }}>
                    <DialogContent>
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
                            {loading ? <CircularProgress color="primary" size={24} /> : "Sign In"}
                        </Button>
                    </DialogActions>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Button onClick={handleSignupClick}>New User? signup</Button>
                        </Box>
                        <Box>
                            <Button>Forgot Password</Button>
                        </Box>
                    </Box>
                </form>
            </Dialog>
            <SignupDialog open={signupDialohOpen} setOpen={setSignupDialogOpen}></SignupDialog>
        </div>
    );
}
