import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

// Actions
import * as CategoriesActions from '../actions/categories';

// Components
import { Loader } from '../components';
import CategoriesSidebar from './CategoriesSidebar';

// Style
import './Home.css';
import CategoryView from './CategoryView';

class Home extends Component {
  state = {
    actualCategory: null,
  };
  async componentDidMount() {
    await this.props.getAllCategories();
    const { category } = this.props.match.params;
    this.setState({
      actualCategory: category,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.category !== prevState.actualCategory) {
      const { category } = nextProps.match.params;
      return {
        actualCategory: category,
      };
    }
    return false;
  }

  render() {
    const { isFetching } = this.props.categories;
    const { actualCategory } = this.state;
    return isFetching ? (
      <Loader />
    ) : (
      <div className="home">
        <CategoriesSidebar />
        <CategoryView category={actualCategory} />
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
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);
