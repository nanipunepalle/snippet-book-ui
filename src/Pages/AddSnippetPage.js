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


import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";

import Languages from '../Components/Languages';
import FrameWorks from '../Components/FrameWorks';


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
    }
}));

export default function AddSnippetPage() {
    const classes = useStyles();
    const [desc, setDesc] = React.useState(null);
    const [lang, setLang] = React.useState(null);
    const [frameWorks, setFrameWorks] = React.useState([]);
    const [code, setCode] = React.useState(null);

    function onChange(newValue) {
        setCode(newValue);
    }

    return (
        <div className={classes.grow}>
            <Grid container component="main">
                <Grid item xs={12} md={2}>

                </Grid>
                <Grid item xs={12} md={8} >
                    <Typography variant="h5">Store your code and access it with ease</Typography>
                    <Autocomplete
                        aria-required
                        fullWidth
                        id="language"
                        options={Languages}
                        getOptionLabel={(option) => option.title}
                        className={classes.field}
                        value={lang}
                        onChange={(e,v)=>{setLang(v)}}
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
                        value={desc}
                        onChange={(e)=>{setDesc(e.target.value)}}
                        variant="outlined"
                    />

                    <RadioGroup aria-label="type" name="type" defaultValue="public">
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

                    <AceEditor
                        height="300px"
                        width="100%"
                        theme="monokai"
                        value={code}
                        onChange={onChange}
                        mode="javascript" />

                    <Button
                        variant="contained"
                        fullWidth color="primary"
                        className={classes.button}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
