import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Post from './Post';
import PostForm from './PostForm';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/:category?" component={Home} />
          <Route exact path="/:category/post/new" component={PostForm} />
          <Route exact path="/:category/post/:postID" component={Post} />
          <Route
            exact
            path="/:category/post/:postID/edit"
            component={PostForm}
          />
          <Route exact path="/post/new" component={PostForm} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
