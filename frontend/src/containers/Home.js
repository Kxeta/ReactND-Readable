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
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// Style
import CategoryView from './CategoryView';
import theme from '../theme/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './Home.css';

class Home extends Component {
  state = {
    actualCategory: null,
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
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
    const { actualCategory, mobileOpen } = this.state;
    return isFetching ? (
      <Loader />
    ) : (
      <MuiThemeProvider theme={theme}>
        <div className="home">
          <CategoriesSidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <CategoryView
            category={actualCategory}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <Fab color="secondary" aria-label="Add Post" className="add-button">
            <AddIcon />
          </Fab>
        </div>
      </MuiThemeProvider>
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
