import React from 'react';
 
const PostsContext = React.createContext({
    posts: null,
    setPosts: ()=>{},
    likedPosts: null,
    setLikedPosts: ()=>{},
    contextLoading: false,
    setContextLoading: ()=>{}
});
 
export default PostsContext;