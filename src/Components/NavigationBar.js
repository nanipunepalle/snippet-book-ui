import React from 'react';
import {withRouter} from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';

import SigninDialog from './SigninDialog';
import SignupDialog from './SignupDialog';
import AuthContext from '../AuthContext';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        padding: theme.spacing(0),
        margin: theme.spacing(0)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '50%',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            //   width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    button: {
        // maxWidth: "400px",
        fullWidth: true,
        borderRadius: theme.spacing(1),
        margin: theme.spacing(2),
        width: "80%"
    }
}));

export default withRouter(function NavigationBar(props) {
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [signinDialogOpen, setSigninDialohOpen] = React.useState(false)
    const [signupDialohOpen, setSignupDialogOpen] = React.useState(false);
    const [authorised, setAuthorised] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const { setCurrentUser } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (token) {
            setAuthorised(true);
        }
        else {
            setAuthorised(false);
        }
    }, [token])

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        fetch(process.env.REACT_APP_API_URL + '/api/user/logout', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(value => {
                    setAnchorEl(null)
                    localStorage.removeItem('token');
                    setCurrentUser(null);
                    setAuthorised(false);
                    props.history.push('/')
                })
            }
            else {
                localStorage.removeItem('token');
                setCurrentUser(null);
                setAuthorised(false)
            }
        })
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={()=>{props.history.push('/profile');setAnchorEl(null);}}>Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="sticky">
                <Toolbar>
                <Button style={{ color: "#ffffff" }} onClick={()=>{props.history.push('/')}}><Typography className={classes.title} variant="h6" noWrap>
                        SnippetBook
                    </Typography>
                    </Button>
                    
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            fullWidth
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {!authorised &&
                            <React.Fragment>
                                <Button  onClick={() => { setSigninDialohOpen(true) }}>Login</Button>
                                <Button  onClick={() => { setSignupDialogOpen(true) }}>Signup</Button></React.Fragment>}
                        {authorised &&
                            <React.Fragment>
                                <Button style={{ color: "#ffffff" }} onClick={()=>{props.history.push('/your_snippets')}}>Your Snippets</Button>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </React.Fragment>}
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <div>
                {props.children}
            </div>
            <SigninDialog open={signinDialogOpen} setOpen={setSigninDialohOpen}></SigninDialog>
            <SignupDialog open={signupDialohOpen} setOpen={setSignupDialogOpen}></SignupDialog>
        </div>
    );
})
