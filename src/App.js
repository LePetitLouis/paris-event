import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './views/Home/Home';
import Search from './views/Search/Search';
import Fav from './views/Fav/Fav';
import InfoEvent from './views/InfoEvent/InfoEvent';

import Header from './components/Header/header';

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/fav" exact component={Fav} />
        <Route path="/event/:id" component={InfoEvent} />
      </Switch>

    </Router>
  );
}

export default App;
