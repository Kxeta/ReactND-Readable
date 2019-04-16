import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types'

// Actions
import * as PostsActions from '../actions/posts';

// Components
import Loader from '../components/Loader';

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
      <div>
        <h1 className="category-title">{category ? category : 'ALL'}</h1>
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
