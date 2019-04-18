import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as PostsActions from '../actions/posts';
import Loader from '../components/Loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import { Header } from '../components';

export class Post extends Component {
  static propTypes = {
    // prop: PropTypes,
  };

  state = {
    postID: null,
    showLoader: true,
  };

  componentDidMount() {
    const { postID } = this.props.match.params;
    if (postID) {
      this.props.getPostById(postID);
    }
    this.setState({
      postID,
      showLoader: false,
    });
  }

  handleBack = () => {
    this.setState(
      {
        showLoader: true,
      },
      () => {
        this.props.history.push('/');
      },
    );
  };

  render() {
    const { isLoading, post } = this.props;
    const { showLoader, postID } = this.state;
    console.log(this.props);
    console.log(post);
    return (
      <div className="post-container">
        {isLoading || showLoader ? (
          <Loader />
        ) : (
          <MuiThemeProvider theme={theme}>
            <Header
              title={postID ? 'Post Details' : 'New Post'}
              goBack
              handleGoBack={this.handleBack}
            />
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    post: state.posts.post,
    isLoading: state.posts.isLoading,
  };
};

const mapDispatchToProps = {
  getPostById: PostsActions.getPostById,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Post),
);
