import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Box from '@material-ui/core/Box';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';


import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import ShareDialog from '../Components/ShareDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.spacing(1)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export default function HomeCard(props) {
    const classes = useStyles();
    const token  = localStorage.getItem('token');
    const [open,setOpen] = React.useState(false);
    const [postedDate, setPostedDate] = React.useState(null);
    const post = props.post;

   

    React.useEffect(() => {
        const postedate = new Date(post.posted_on.$date);
        setPostedDate(postedate);
    }, [post])

    const handleCopyButton = () => {
        navigator.clipboard.writeText(post.code)
    }

    const handleLikeButton = () => {
        fetch(process.env.REACT_APP_API_URL+"/api/post/add_like?id="+post._id["$oid"],{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response=>{
            if(response.status === 200){
                console.log(response);
                response.json().then(value=>{
                    console.log(value);
                })
            }
        })
    }

    const handleShareButton = () => {
        setOpen(true);
    }

    const handleShareDialogClose = () => {
        setOpen(false);
    }

    return (
        <Card className={classes.root}>

            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                    {post.desc}
                </Typography>
            </CardContent>
            <div>
                <Box display="flex">
                    <Box >
                        <Typography style={{ margin: "10px" }}>{post.language}</Typography>
                    </Box>
                    {
                        post.frameworks.map((f, index) => {
                            return <Box >
                                <Typography style={{ margin: "10px" }}>{f.title}</Typography>
                            </Box>
                        })
                    }
                    <Box flexGrow={1}>

                    </Box>
                    <Box>
                        <IconButton aria-label="copy-button" onClick={handleCopyButton}>
                            <FileCopyOutlinedIcon></FileCopyOutlinedIcon>
                        </IconButton>
                    </Box>
                </Box>
            </div>
            <AceEditor
                height="300px"
                width="100%"
                theme="monokai"
                value={post.code}
                readOnly
                mode="javascript" />
            <CardHeader
                avatar={
                    <Avatar aria-label={post.user_name} className={classes.avatar}>
                        <Typography style={{ color: "#ffffff" }}>{post.user_name[0]}</Typography>
                    </Avatar>
                }
                action={
                    <React.Fragment>
                        <IconButton aria-label="add to favorites" onClick={handleLikeButton}>
                            <ThumbUpIcon />{post.likes}
                        </IconButton>
                        <IconButton aria-label="share" onClick={handleShareButton}>
                            <ShareIcon />
                        </IconButton></React.Fragment>
                }
                title={post.user_name}
                subheader={postedDate !== null && postedDate.toDateString()}
            />
            <ShareDialog post={post} open={open} handleClose={handleShareDialogClose}></ShareDialog>
        </Card>
    );
}