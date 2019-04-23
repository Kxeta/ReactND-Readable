import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Post from './Post';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/:category?" component={Home} />
          <Route exact path="/post/:postID" component={Post} />
        </Switch>
      </div>
    );
  }
}

export default App;
