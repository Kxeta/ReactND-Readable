import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

// Actions
import * as CategoriesActions from '../actions/categories';
import * as PostsActions from '../actions/posts';

// Components
import { Loader } from '../components';
import CategoriesSidebar from './CategoriesSidebar';

// Style
import './Home.css';

class Home extends Component {
  state = {
    actualCategory: null,
  };
  async componentDidMount() {
    await this.props.getAllCategories();
    const { category } = this.props.match.params;
    if (!category) {
      this.props.getAllPosts();
    } else {
      this.props.getAllPostsFromCategory(category);
    }
    this.setState({
      actualCategory: category,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.category !== prevState.actualCategory) {
      const { category } = nextProps.match.params;
      if (!category) {
        nextProps.getAllPosts();
      } else {
        nextProps.getAllPostsFromCategory(category);
      }
      return {
        actualCategory: category,
      };
    }
    return false;
  }

  render() {
    const { isFetching } = this.props.categories;
    const { isLoading: isLoadingPosts } = this.props.posts;
    const { category } = this.props.match.params;
    return isFetching ? (
      <Loader />
    ) : (
      <div className="home">
        <CategoriesSidebar />
        <div className="home-content">
          {isLoadingPosts ? (
            <Loader />
          ) : (
            <div>{category ? category : 'Choose your destine'}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllCategories: CategoriesActions.getAllCategories,
      getAllPosts: PostsActions.getAllPosts,
      getAllPostsFromCategory: PostsActions.getAllPostsFromCategory,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);
