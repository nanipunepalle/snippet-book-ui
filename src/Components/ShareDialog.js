import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid, IconButton } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function ShareDialog(props) {
    // const classes = useStyles();
    const theme = useTheme();
    const [title, setTitle] = React.useState(null);
    const post = props.post
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error',
        autoHide: 300
    });
    const { vertical, horizontal, open, message, type, autoHide } = state;

    React.useEffect(() => {
        setTitle("http://localhost:3000/snippet/"+post._id["$oid"])
    }, [post])

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    const handleClose = async (event, reason) => {
        setState({ ...state, open: false });
    };




    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'center',
                message: 'Copied to clipboard',
                type: "success",
                autoHide: 3000
            });
        } catch (err) {
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'center',
                message: err.message,
                type: "error",
                autoHide: 4000
            })
        }
    };


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={autoHide}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={type}>{message}</Alert>
            </Snackbar>
            <Dialog open={props.open} fullWidth={true} PaperProps={{
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: 'none',
                },
            }} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                {/* <DialogTitle id="form-dialog-title">{post.name}</DialogTitle> */}
                <DialogContent>
                    <Grid container spacing={2} >
                        <Grid item xs={11}>
                            <TextField
                                disabled
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Share Link"
                                name="title"
                                fullWidth
                                value={title}
                                required
                                onChange={handleTitleChange}
                            />

                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={() => copyToClipBoard(title)}><FileCopyIcon ></FileCopyIcon></IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Dismiss
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
