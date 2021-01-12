// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import Home from './Pages/Home';
import AddSnippetPage from './Pages/AddSnippetPage'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <NavigationBar>
            <Route exact path="/" component={Home} />
            <Route exact path="/add_snippet" component={AddSnippetPage} />
          </NavigationBar>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
