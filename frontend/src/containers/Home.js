import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

// Actions
import * as CategoryActions from '../actions/categories';
import { Loader } from '../components';
import CategoriesSidebar from './CategoriesSidebar';

// Style
import './Home.css';

class Home extends Component {
  async componentDidMount() {
    await this.props.getAllCategories();
    const { category } = this.props.match.params;
    console.log(category);
  }
  render() {
    const { isFetching } = this.props.categories;
    const { category } = this.props.match.params;
    console.log('category', category);
    return isFetching ? (
      <Loader />
    ) : (
      <div className="home">
        <CategoriesSidebar />
        <div className="home-content">
          <div>{category ? category : 'Choose your destine'}</div>
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
      getAllCategories: CategoryActions.getAllCategories,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);
