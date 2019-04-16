import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types'

// Actions
import * as PostsActions from '../actions/posts';

// Components
import Loader from '../components/Loader';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import './CategoryView.css';

export class CategoryView extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  componentDidMount() {
    const { category } = this.props;
    if (!category) {
      this.props.getAllPosts();
    } else {
      this.props.getAllPostsFromCategory(category);
    }
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props;
    const { category: prevCategory } = prevProps;
    if (category !== prevCategory) {
      if (!category) {
        this.props.getAllPosts();
      } else {
        this.props.getAllPostsFromCategory(category);
      }
    }
  }

  render() {
    const { isLoading, postsList } = this.props.posts;
    const { category } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <div className="home-content">
        <CssBaseline />
        <AppBar position="fixed" className="appBar">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className="menuButton"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {category ? category.toUpperCase() : 'ALL'}
            </Typography>
          </Toolbar>
        </AppBar>
        <main className="content">
          <div className="toolbar" />
          {postsList.map((post, key) => {
            const date = Moment(post.timestamp);
            const momentDate = Moment(date).fromNow();
            return (
              <div key={key}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
                <p className="post-info">{`${post.author}(${date.format(
                  'MM/DD/YYYY',
                )}) - ${momentDate}`}</p>
              </div>
            );
          })}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllPosts: PostsActions.getAllPosts,
      getAllPostsFromCategory: PostsActions.getAllPostsFromCategory,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryView);
