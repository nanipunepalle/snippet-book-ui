import React from 'react';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import AuthContext from '../AuthContext';
import SignupDialog from './SignupDialog';
import ApiService from '../Apis/apiservice';

export default function SigninDialog(props) {

    const { setCurrentUser } = React.useContext(AuthContext);
    const [signupDialohOpen, setSignupDialogOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

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
                        props.setOpen(false);
                    })
                }
                else {
                    //alert something went wrong
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
            <Dialog open={props.open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="signup-dialog">
                <DialogTitle id="signup-dialog-title"><Box display="flex" justifyContent="center">Signin</Box></DialogTitle>
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
