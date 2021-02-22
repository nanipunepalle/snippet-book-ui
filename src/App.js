import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// other components imports
import NavigationBar from './Components/NavigationBar';
import Home from './Pages/Home';
import AddSnippetPage from './Pages/AddSnippetPage';
import ProfilePage from './Pages/ProfilePage';
import YourSnippet from './Components/YourSnippets';
import AuthContext from './AuthContext';
import PostsContext from './PostsContext';

import ApiService from './Apis/apiservice';

function App() {
  const token = localStorage.getItem('token');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [contextLoading, setContextLoading] = React.useState(false);

  const value = { currentUser, setCurrentUser };
  const postContextValue = { posts, setPosts, contextLoading, setContextLoading };

  React.useEffect(() => {
    if (token) {
      ApiService.getUser(token, (response,success) => {
        if(success){
          if (response.status === 200) {
            response.json().then(value => {
              setCurrentUser(value);
            })
          }
          else {
            setCurrentUser(null);
            localStorage.removeItem('token')
          }
        }
      })
    }
  }, [token])

  React.useEffect(() => {
    setContextLoading(true);
    if (token) {
      ApiService.getAllPosts(token, (response) => {
        if (response.status === 200) {
          response.json().then(value => {
            setPosts(value.reverse())
            setContextLoading(false)
          })
        }
        else {
          localStorage.removeItem('token')
          setContextLoading(false);
        }
      })
    }
    else {
      ApiService.getPublicPosts((response) => {
        if (response.status === 200) {
          response.json().then(value => {
            setPosts(value.reverse());
            setContextLoading(false);
          })
        }
        else {
          localStorage.removeItem('token');
          setContextLoading(false);
        }
      })
    }
  }, [token])

  return (
    <Router>
      <div>
        <Switch>
          <AuthContext.Provider value={value}>
            <PostsContext.Provider value={postContextValue}>
              <NavigationBar posts={posts}>
                <Route exact path="/" component={Home} />
                <Route exact path="/add_snippet" component={AddSnippetPage} />
                <Route exact path="/your_snippets" component={YourSnippet} />
                <Route exact path="/profile" component={ProfilePage} />
              </NavigationBar>
            </PostsContext.Provider>
          </AuthContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;