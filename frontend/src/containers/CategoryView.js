import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types'

// Actions
import * as PostsActions from '../actions/posts';

// Components
import { Loader, PostCard } from '../components';
import MenuIcon from '@material-ui/icons/Menu';

// Styles
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';

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
              onClick={this.props.handleDrawerToggle}
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
            return <PostCard post={post} key={key} />;
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
