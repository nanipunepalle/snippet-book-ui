import React from 'react';
import { withRouter } from 'react-router-dom'

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

import SigninDialog from './SigninDialog';
import SignupDialog from './SignupDialog';
import AuthContext from '../AuthContext';
import ApiService from '../Apis/apiservice';

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
    const [isHome, setIsHome] = React.useState(true);
    const posts = props.posts
    const [sortedPosts, setSortedPosts] = React.useState([])

    const isMenuOpen = Boolean(anchorEl);

    const { setCurrentUser } = React.useContext(AuthContext);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(true)
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

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
        ApiService.logout(token, (response, success) => {
            if (success) {
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
            }
            else {
                //alert aomething went wrong error
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
            <MenuItem onClick={() => { props.history.push('/profile'); setAnchorEl(null); }}>Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
    );

    const handleYourSnippetsButton = () => {
        if (isHome) {
            setIsHome(false);
            props.history.push('/your_snippets')
        }
        else {
            setIsHome(true);
            props.history.push('/')
        }
    }

    const handleSearchChange = (e) => {
        setSortedPosts(posts.filter(p => { return p.desc.toLowerCase().includes(e.target.value.toLowerCase()) }))
    }



    return (
        <div className={classes.grow}>
            <AppBar position="sticky">
                <Toolbar>
                    <Button style={{ color: "#ffffff" }} onClick={() => { setIsHome(true); props.history.push('/') }}><Typography className={classes.title} variant="h6" noWrap>
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
                            onChange={handleSearchChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onFocus={handleToggle}
                            inputProps={{ 'aria-label': 'search' }}
                            ref={anchorRef}
                        />

                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper elevation={0} style={{ maxWidth: "700px", minWidth: "700px" }}>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList id="sorted-posts-list" onKeyDown={handleListKeyDown}>
                                                {
                                                    sortedPosts.map((post, index) => {
                                                        return <MenuItem key={index} onClick={handleClose}>{post.desc}</MenuItem>
                                                    })
                                                }
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {!authorised &&
                            <React.Fragment>
                                <Button style={{ color: "#ffffff" }} onClick={() => { setSigninDialohOpen(true) }}>Login</Button>
                                <Button style={{ color: "#ffffff" }} onClick={() => { setSignupDialogOpen(true) }}>Signup</Button></React.Fragment>}
                        {authorised &&
                            <React.Fragment>
                                <Button style={{ color: "#ffffff" }} onClick={handleYourSnippetsButton}>{isHome ? "Your Snippets" : "Home"}</Button>
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
