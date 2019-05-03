import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Hidden, Drawer, TextField, Divider } from '@material-ui/core';
// import PropTypes from 'prop-types';

import './CategoriesSidebar.css';
import { Sidebar } from '../components';

class CategoriesSidebar extends Component {
  state = {
    categoriesList: this.props.categories.categoriesList,
    filter: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.categories) !==
      JSON.stringify(prevState.categoriesList)
    ) {
      const regexFilter = new RegExp(prevState.filter, 'i');
      return {
        categoriesList: nextProps.categories.categoriesList.filter(category =>
          category.name.match(regexFilter),
        ),
      };
    }
    return false;
  }

  handleFilterChange = e => {
    const filterString = e.target.value;
    const regexFilter = new RegExp(filterString, 'i');
    const resultList = this.state.categoriesList.filter(category =>
      category.name.match(regexFilter),
    );

    this.setState({
      filter: filterString,
      categoriesList: resultList,
    });
  };

  render() {
    const { filter, categoriesList } = this.state;
    const sidebarCategoriesList = [
      { name: 'All', path: '/' },
      ...categoriesList,
    ];
    return (
      <div className="categories-sidebar">
        <nav className="drawer">
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={'left'}
              open={this.props.mobileOpen}
              onClose={this.props.handleDrawerToggle}
              classes={{
                paper: 'drawerPaper',
              }}
            >
              <div>
                <div className="toolbar">
                  <h2>Categories</h2>
                  <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    value={filter}
                    margin="normal"
                    onChange={this.handleFilterChange}
                    fullWidth
                  />
                </div>
                <Divider />
                <Sidebar title={'Categories'} list={sidebarCategoriesList} />
              </div>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: 'drawerPaper',
              }}
              variant="permanent"
              open
            >
              <div>
                <div className="toolbar">
                  <h2>Categories</h2>
                  <TextField
                    id="standard-search"
                    label="Search a category"
                    type="search"
                    value={filter}
                    margin="normal"
                    onChange={this.handleFilterChange}
                  />
                </div>
                <Divider />
                <Sidebar title={'Categories'} list={sidebarCategoriesList} />
              </div>
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(CategoriesSidebar);
