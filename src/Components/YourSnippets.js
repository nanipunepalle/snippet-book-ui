import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Typography } from '@material-ui/core';

import HomeCard from '../Components/HomeCard';


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
        if(token){
            fetch(process.env.REACT_APP_API_URL + '/api/get_your_posts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: "GET"
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then(value => {
                        setPosts(value.reverse())
                    })
                }
                else {
                    localStorage.removeItem('token')
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
                <Typography variant="h5" style={{margin:"10px"}}>Your Snippets</Typography>
                    {
                        posts.map((post, index) => {
                            return <HomeCard post={post}></HomeCard>
                        })
                    }
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