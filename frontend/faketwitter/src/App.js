import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

import Home from './pages/Home'
import Tweets from './pages/Tweets';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Tweets" component={Tweets}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
