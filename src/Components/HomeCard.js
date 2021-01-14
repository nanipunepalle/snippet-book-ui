import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
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
    const [postedDate, setPostedDate] = React.useState(null);
    const post = props.post;

    React.useEffect(() => {
        const postedate = new Date(post.posted_on.$date);
        setPostedDate(postedate);
    }, [post])

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label={post.user_name} className={classes.avatar}>
                        <Typography style={{ color: "#ffffff" }}>{post.user_name[0]}</Typography>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.user_name}
                subheader={postedDate !== null && postedDate.toDateString()}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.desc}
                </Typography>
            </CardContent>
            <AceEditor
                height="300px"
                width="100%"
                theme="monokai"
                value={post.code}
                readOnly
                mode="javascript" />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
