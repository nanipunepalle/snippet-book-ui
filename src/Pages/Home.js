import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid, Paper } from '@material-ui/core';

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
    },
    subRpaper: {
        position: 'relative',
        overflow: 'auto',
        maxHeight: '89vh',
    },
}));

export default function Home(props) {
    const classes = useStyles();

    const handleAddButton = () => {
        props.history.push('/add_snippet')
    }

    return (
        <div className={classes.grow}>
            <Grid container component="main">
                <Grid item xs={12} md={3}>
                </Grid>
                <Grid item xs={12} md={7}>
                    <HomeCard></HomeCard>
                    <HomeCard></HomeCard>
                    <HomeCard></HomeCard>
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