import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types'

// Actions
import * as PostsActions from '../actions/posts';

// Components
import { Loader, PostCard } from '../components';

// Styles

import './CategoryView.css';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom';
import {
  UPVOTE,
  DOWNVOTE,
  ORDER_BY_TIMESTAMP,
  ORDER_BY_VOTESCORE,
} from '../constants/utils';
import { Button, Menu, MenuItem } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export class CategoryView extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  state = {
    openMenu: false,
    anchorMenu: null,
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

  handleMenu = event => {
    this.setState({ openMenu: true, anchorMenu: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ openMenu: false, anchorMenu: null });
  };

  handleSort = (criteria, asc = true) => {
    this.props.sortPosts(criteria, asc);
  };

  render() {
    const { isLoading, postsList } = this.props.posts;
    const { category, loggedUser } = this.props;
    const { openMenu, anchorMenu } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <div className="home-content">
        <Header
          title={category ? category.toUpperCase() : 'ALL'}
          handleDrawerToggle={this.props.handleDrawerToggle}
          hasSidebar
        >
          <Button
            aria-owns={openMenu ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <SortIcon />
            Sort
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={this.handleClose}
          >
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.handleSort(ORDER_BY_TIMESTAMP);
              }}
            >
              <ArrowUpwardIcon /> Date
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.handleSort(ORDER_BY_TIMESTAMP, false);
              }}
            >
              <ArrowDownwardIcon /> Date
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.handleSort(ORDER_BY_VOTESCORE);
              }}
            >
              <ArrowUpwardIcon /> Vote Score
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.handleSort(ORDER_BY_VOTESCORE, false);
              }}
            >
              <ArrowDownwardIcon /> Vote Score
            </MenuItem>
          </Menu>
        </Header>
        <main className="content">
          <div className="toolbar" />
          {postsList.map((post, key) => {
            return (
              <PostCard
                post={post}
                key={key}
                handleClick={post =>
                  this.props.history.push(`${post.category}/post/${post.id}`)
                }
                handleClickEdit={post =>
                  this.props.history.push(
                    `${post.category}/post/${post.id}/edit`,
                  )
                }
                onUpVote={postID => this.props.votePostById(postID, UPVOTE)}
                onDownVote={postID => this.props.votePostById(postID, DOWNVOTE)}
                onDeletePost={postID => this.props.deletePostById(postID)}
                postOwner={post.author === loggedUser}
              />
            );
          })}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  loggedUser: state.user.loggedUser,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllPosts: PostsActions.getAllPosts,
      sortPosts: PostsActions.sortPosts,
      votePostById: PostsActions.votePostById,
      deletePostById: PostsActions.deletePostById,
      getAllPostsFromCategory: PostsActions.getAllPostsFromCategory,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CategoryView),
);
