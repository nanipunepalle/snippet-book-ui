import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
// import Button fro
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';


import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";

import Languages from '../Components/Languages';
import FrameWorks from '../Components/FrameWorks';
import AlertToast from '../Components/AlertToast';
import PostsContext from '../PostsContext';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    editor: {
        height: "100px"
    },
    root: {
        padding: theme.spacing(1),
    },
    field: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        // maxWidth: "600px",
    },
    descField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(7),
        [theme.breakpoints.down('md')]: {
            top: theme.spacing(12),
        }
    },
}));

export default function EditSnippetPage(props) {
    const classes = useStyles();
    const id = props.match.params.id;
    const token = localStorage.getItem("token");
    const [desc, setDesc] = React.useState(null);
    const [lang, setLang] = React.useState(null);
    const [frameWorks, setFrameWorks] = React.useState([]);
    const [code, setCode] = React.useState(null);
    const [type, setType] = React.useState('public');
    // const [post, setPost] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error'
    });
    const { setPosts } = React.useContext(PostsContext);


    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/get_post?id=' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(value => {
                    // setPost(value[0])
                    setDesc(value[0].desc);
                    setType(value[0].access_type);
                    setLang(value[0].language);
                    setCode(value[0].code);
                    setFrameWorks(value[0].frameworks)
                })
            }
        })
    }, [id])


    function onChange(newValue) {
        setCode(newValue);
    }

    const handleCloseButton = () => {
        props.history.goBack();
    }

    const handleEditButton = () => {
        try {
            setLoading(true);
            var data = new FormData()
            const payload = {
                desc: desc,
                lang: lang,
                frameworks: frameWorks,
                code: code,
                type: type,
                post_id: id
            };
            data = JSON.stringify(payload);
            fetch(process.env.REACT_APP_API_URL + '/user/edit_snippet', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(value => {
                        setPosts(value.posts.reverse())
                        setLoading(false);
                        setState({
                            ...state,
                            open: true,
                            message: "Successfull",
                            type: "success",
                        })
                        props.history.push(`/snippet/${id}`);
                    })
                }
                else {
                    setLoading(false);
                    setState({
                        ...state,
                        open: true,
                        message: "Something went wrong Try again",
                        type: "error",
                    })
                }
            })
        }
        catch (error) {
            setLoading(false);
            setState({
                ...state,
                open: true,
                message: "Something went wrong Try again",
                type: "error",
            })
        }
    }

    return (
        <div className={classes.grow}>
            <AlertToast state={state} setState={setState}></AlertToast>
            <Grid container component="main">
                <Grid item xs={12} md={2}>

                </Grid>
                <Grid item xs={12} md={8} >
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseButton}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h5" style={{ margin: "20px" }}>Add your code</Typography>
                    <Autocomplete
                        aria-required
                        fullWidth
                        id="language"
                        options={Languages}
                        getOptionLabel={(option) => option}
                        className={classes.field}
                        value={lang || ''}
                        onChange={(e, v) => { setLang(v) }}
                        renderInput={(params) => <TextField required {...params} fullWidth label="Language" variant="filled" />}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        fullWidth
                        multiline
                        required
                        rows={5}
                        className={classes.descField}
                        value={desc || ""}
                        onChange={(e) => { setDesc(e.target.value) }}
                        variant="outlined"
                    />
                    <RadioGroup color="secondary" aria-label="type" name="type" value={type} onChange={(e) => { setType(e.target.value) }}>
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                    </RadioGroup>
                    <Autocomplete
                        fullWidth
                        id="language"
                        getOptionLabel={(option) => option.title}
                        freeSolo
                        multiple
                        options={FrameWorks}
                        value={frameWorks}
                        onChange={(e, values) => { setFrameWorks(values) }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    variant="outlined"
                                    label={option.title}
                                    {...getTagProps({ index })} />
                            ))
                        }
                        className={classes.field}
                        renderInput={
                            (params) =>
                                <TextField {...params}
                                    fullWidth
                                    label="Frame Works and Keywords(Optional)"
                                    variant="filled" />}
                    />

                    <Typography align="left">Code Editor </Typography>
                    <div>
                        <AceEditor
                            height="300px"
                            width="100%"
                            theme="monokai"
                            value={code}
                            onChange={onChange}
                            mode="javascript" />
                    </div>
                    <Button
                        variant="contained"
                        disabled={loading}
                        fullWidth color="primary"
                        onClick={handleEditButton}
                        className={classes.button}>
                        {loading ? <CircularProgress color="primary" size={24} /> : "Edit"}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
