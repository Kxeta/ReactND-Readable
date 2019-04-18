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
        <Header
          title={category ? category.toUpperCase() : 'ALL'}
          handleDrawerToggle={this.props.handleDrawerToggle}
          hasSidebar
        />
        <main className="content">
          <div className="toolbar" />
          {postsList.map((post, key) => {
            return (
              <PostCard
                post={post}
                key={key}
                handleClick={post =>
                  this.props.history.push(`/post/${post.id}`)
                }
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
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllPosts: PostsActions.getAllPosts,
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
