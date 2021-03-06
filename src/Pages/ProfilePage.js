import React from 'react';

//material ui imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

//material imports
import HomeCard from '../Components/HomeCard';
import AuthContext from '../AuthContext';


const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginRight: theme.spacing(3),
        backgroundColor: theme.palette.primary.main
    },
    main: {
        padding: theme.spacing(5),
        backgroundColor: theme.palette.secondary.main,
        elevatio: "5"
    },
    root: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
    button: {
        fullWidth: true,
        borderRadius: theme.spacing(1),
        margin: theme.spacing(2),
        width: "80%"
    },

}));




function ProfilePage(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const [value, setValue] = React.useState(0);
    const { currentUser } = React.useContext(AuthContext);
    // const [currentUser, setCurrentUser] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const [sortedPosts, setSortedPosts] = React.useState([]);

    React.useEffect(() => {
        if (token) {
            fetch(process.env.REACT_APP_API_URL + '/get_your_posts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: "GET"
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then(value => {
                        // console.log(value)
                        setPosts(value);
                        setSortedPosts(value);
                    })
                }
                else {
                    localStorage.removeItem('token')
                }
            })
        }
    }, [token])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log(newValue)
        if (newValue === 0) {
            setSortedPosts(posts)
        }
        else if (newValue === 1) {
            setSortedPosts(posts.filter(p => { return p.access_type === "public" }))
        }
        else if (newValue === 2) {
            setSortedPosts(posts.filter(p => { return p.access_type === "private" }))
        }
    };

    const handleAddButton = () => {
        if (token) {
            props.history.push('/add_snippet')
        }
        else {
            // setSigninDialohOpen(true);
        }

    }

    return (
        <Grid container component="main">
            <Grid item xs={12} md={2}>

            </Grid>
            <Grid item xs={12} md={8}>
                {currentUser !== null && currentUser !== undefined && <React.Fragment>
                    <Paper>
                        <Box display="flex" justifyContent="center" className={classes.main}>
                            <Box>
                                <Avatar className={classes.avatar}>{currentUser.name[0]} </Avatar>
                            </Box>
                            <Box>
                                <Box>
                                    <Typography variant="h4" color="#000000">{currentUser.name}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2">{currentUser.email}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="on">
                            <Tab label="All Snippets" />
                            <Tab label="Public Snippets" />
                            <Tab label="Private Snippets"></Tab>
                        </Tabs>
                    </Paper>
                    {<div>
                        {
                            sortedPosts.map((post, index) => {
                                return <HomeCard post={post}></HomeCard>
                            })
                        }
                        {
                            sortedPosts.length === 0 && <Typography>No Snippets</Typography>
                        }
                    </div>}
                </React.Fragment>}
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
    );
}

export default ProfilePage;