import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import HomeCard from '../Components/HomeCard';
import ApiService from '../Apis/apiservice';

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
        backgroundColor: theme.palette.primary.light
    },
    subRpaper: {
        position: 'relative',
        overflow: 'auto',
        maxHeight: '89vh',
        backgroundColor: theme.palette.primary.light
    },
}));

export default function YourSnippets(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const [posts, setPosts] = React.useState([]);

    const handleAddButton = () => {
        props.history.push('/add_snippet')
    }

    React.useEffect(() => {
        if (token) {
            ApiService.getYourPosts(token, (response, success) => {
                if (success) {
                    if (response.status === 200) {
                        response.json().then(value => {
                            setPosts(value.reverse())
                        })
                    }
                    else {
                        localStorage.removeItem('token')
                    }
                }
                else{
                    //alert something went wrong
                }
            })
        }
    }, [token])
    return (
        <div className={classes.grow}>
            <Grid container component="main">
                <Grid item xs={12} md={2}>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" style={{ margin: "10px" }}>Your Snippets</Typography>
                    {posts.map((post, index) => {
                        return <HomeCard post={post}></HomeCard>
                    })}
                </Grid>
                <Grid item xs={12} md={2}>
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
        </div>
    );
}