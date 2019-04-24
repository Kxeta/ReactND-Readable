import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as PostsActions from '../actions/posts';
import * as CategoriesActions from '../actions/categories';
// import PropTypes from 'prop-types'
import Loader from '../components/Loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Header from '../components/Header';
import {
  Button,
  Paper,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Input,
  MenuItem,
} from '@material-ui/core';

class PostForm extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  state = {
    postID: null,
    showLoader: true,
    postTitle: '',
    postContent: '',
    postCategory: '',
    postAuthor: '',
    postDeleted: false,
  };

  async componentDidMount() {
    const { postID, category } = this.props.match.params;
    console.log('PostForm', postID);
    if (!this.props.categoriesList.length) {
      await this.props.getAllCategories();
    }
    if (postID) {
      await this.props.getPostById(postID);
      const {
        title,
        body,
        category: postCategory,
        author,
        deleted,
      } = this.props.post;
      this.setState({
        postID: postID,
        postTitle: title,
        postContent: body,
        postCategory: category || postCategory,
        postAuthor: author,
        postDeleted: deleted,
      });
    }
    this.setState({
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

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { isLoading, post, loggedUser, categoriesList } = this.props;
    const {
      showLoader,
      postID,
      postTitle,
      postContent,
      postCategory,
      postAuthor,
      postDeleted,
    } = this.state;
    return (
      <div className="post-container">
        {(isLoading || showLoader) && !post ? (
          <Loader />
        ) : (
          <MuiThemeProvider theme={theme}>
            <Header
              title={postID ? 'Edit Post' : 'New Post'}
              goBack
              handleGoBack={this.handleBack}
            />
            <main className="content">
              <Paper className="post-main-form-wrapper">
                <form autoComplete="off">
                  <TextField
                    id="postTitle"
                    name="postTitle"
                    label="Post Title"
                    InputLabelProps={{ shrink: postTitle ? true : false }}
                    value={postTitle}
                    onChange={this.handleInputChange}
                    fullWidth
                    required
                  />
                  <TextField
                    id="postContent"
                    name="postContent"
                    label="Post Content"
                    InputLabelProps={{ shrink: postContent ? true : false }}
                    value={postContent}
                    onChange={this.handleInputChange}
                    fullWidth
                    multiline
                    required
                    rows="4"
                  />

                  <FormControl fullWidth required>
                    <InputLabel htmlFor="postCategory">Category</InputLabel>
                    <Select
                      value={postCategory}
                      onChange={this.handleInputChange}
                      input={<Input name="postCategory" id="postCategory" />}
                    >
                      {categoriesList.map((category, key) => (
                        <MenuItem value={category.name} key={key}>
                          {category.name.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleBack}
                    >
                      Nah, nevermind...
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Post it!
                    </Button>
                  </div>
                </form>
              </Paper>
            </main>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.post,
    categoriesList: state.categories.categoriesList,
    isLoading: state.posts.isLoading,
    loggedUser: state.user.loggedUser,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPostById: PostsActions.getPostById,
      getAllCategories: CategoriesActions.getAllCategories,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PostForm),
);
