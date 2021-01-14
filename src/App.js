import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import Home from './Pages/Home';
import AddSnippetPage from './Pages/AddSnippetPage';
import ProfilePage from './Pages/ProfilePage';
import YourSnippet from './Components/YourSnippets';

import AuthContext from './AuthContext';

function App() {

  const token = localStorage.getItem('token');
  const [currentUser, setCurrentUser] = React.useState();

  const value = { currentUser, setCurrentUser };

  React.useEffect(() => {
    if (token) {
      fetch(process.env.REACT_APP_API_URL + '/api/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: "GET"
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(value => {
            console.log(value)
            setCurrentUser(value);
          })
        }
        else{
          setCurrentUser(null);
          localStorage.removeItem('token')
        }
      })
    }
  }, [token])


  return (
    <Router>
      <div>
        <Switch>
          <AuthContext.Provider value={value}>
            <NavigationBar>
              <Route exact path="/" component={Home} />
              <Route exact path="/add_snippet" component={AddSnippetPage} />
              <Route exact path="/your_snippets" component={YourSnippet} />
              <Route exact path="/profile" component={ProfilePage} />
            </NavigationBar>
          </AuthContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
