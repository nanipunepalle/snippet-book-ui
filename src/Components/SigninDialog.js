import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import AuthContext from '../AuthContext';

export default function SigninDialog(props) {

    const {setCurrentUser} = React.useContext(AuthContext);

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSignin = (e) => {
        e.preventDefault()
        const { email, password } = e.target.elements;
        try {
            var data = new FormData()
            const payload = {
                email: email.value,
                password: password.value,
            };
            data = JSON.stringify(payload);
            fetch(process.env.REACT_APP_API_URL + '/api/signin', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data
            }).then(response => {
                if(response.status === 200){
                    response.json().then(value=>{
                        // console.log(value)
                        localStorage.setItem('token',value.token);
                        console.log(value.user)
                        setCurrentUser(value.user);
                        props.setOpen(false);
                    })
                }
            })
        }
        catch (error) {

        }
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><Box display="flex" justifyContent="center">Signup</Box></DialogTitle>
                <form onSubmit={handleSignin} style={{padding:"20px",paddingTop:"0px"}}>
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
                        <Button fullWidth variant="contained" type="submit" color="primary">
                            Signin
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
