import React from 'react';
 
const PostsContext = React.createContext({
    posts: null,
    setPosts: ()=>{},
    contextLoading: false,
    setContextLoading: ()=>{}
});
 
export default PostsContext;