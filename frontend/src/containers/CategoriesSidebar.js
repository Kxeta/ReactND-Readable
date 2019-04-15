import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './CategoriesSidebar.css';

class CategoriesSidebar extends Component {
  state = {
    categoriesList: this.props.categories,
    filter: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.categories) !==
      JSON.stringify(prevState.categoriesList)
    ) {
      const regexFilter = new RegExp(prevState.filter);
      return {
        categoriesList: nextProps.categories.filter(category =>
          category.name.match(regexFilter),
        ),
      };
    }
    return false;
  }

  handleFilterChange = e => {
    const filterString = e.target.value;
    const regexFilter = new RegExp(filterString);
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
    const { category: actualCategory } = this.props.match.params;
    return (
      <div className="categories-sidebar">
        <label>
          <input
            placeholder="Search a category!"
            value={filter}
            onChange={this.handleFilterChange}
          />
        </label>
        <ul className="categories-list">
          <li>{!actualCategory ? <b>All</b> : <Link to="/">All</Link>}</li>
          {categoriesList.map((category, key) => (
            <li key={key}>
              {actualCategory === category.path ? (
                <b>{category.name}</b>
              ) : (
                <Link to={category.path}>{category.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories.categoriesList,
  };
};

export default withRouter(connect(mapStateToProps)(CategoriesSidebar));
