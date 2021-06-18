import './assets/scss/App.scss';

import NavbarHeader from './components/shared/header';
import Home from './components/home';
import Footer from './components/shared/footer';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavbarHeader />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to={{ pathname: '/home' }} />
          </Route>
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
