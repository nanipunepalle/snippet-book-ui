import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import HomeCard from '../Components/HomeCard';
import PostsContext from '../PostsContext';
import SigninDialog from '../Components/SigninDialog';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    button: {
        fullWidth: true,
        borderRadius: theme.spacing(1),
        margin: theme.spacing(2),
        width: "80%"
    },
    rightPanel: {
        position: 'sticky',
        margin: theme.spacing(1),
        height: '89vh',
        top: theme.spacing(10),
        backgroundColor: theme.palette.primary.light,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    subRpaper: {
        position: 'relative',
        overflow: 'auto',
        maxHeight: '89vh',
        backgroundColor: theme.palette.primary.light
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 10,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const { posts, contextLoading } = React.useContext(PostsContext);
    const [signinDialogOpen, setSigninDialohOpen] = React.useState(false);

    const handleAddButton = () => {
        if (token) {
            props.history.push('/add_snippet')
        }
        else {
            setSigninDialohOpen(true);
        }

    }

    return (
        <div className={classes.grow}>
            <Grid container component="main">
                <Grid item xs={12} md={2}>
                </Grid>
                <Grid item xs={12} md={8}>
                    {posts !== null && <div>{
                        posts.map((post, index) => {
                            return <HomeCard post={post}></HomeCard>
                        })
                    }</div>}
                    {
                        contextLoading && <div>
                            <Skeleton variant="rect" animation="wave" height={118} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <br></br><br></br>
                            <Skeleton variant="rect" animation="wave" height={118} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </div>
                    }
                </Grid>
                <Grid item xs={12} md={2}>
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleAddButton}>
                        <AddIcon />
                    </Fab>
                    <Paper className={classes.rightPanel} elevation={0}>
                        <Paper className={classes.subRpaper} elevation={0}>
                            <Button
                                onClick={handleAddButton}
                                variant="contained"
                                color="primary"
                                className={classes.button}>
                                Add
                            </Button>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
            <SigninDialog open={signinDialogOpen} setOpen={setSigninDialohOpen}></SigninDialog>
        </div>
    );
}