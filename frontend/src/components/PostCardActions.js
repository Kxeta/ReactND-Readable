import React, { Fragment } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';

import './PostCardActions.css';

const PostCardActions = props => {
  return (
    <div className="post-card-actions">
      <div className="comments-info">
        {!props.hideComments && (
          <Fragment>
            <CommentIcon fontSize="small" color="primary" />
            <Typography>{`(${props.commentCount})`}</Typography>
          </Fragment>
        )}
      </div>
      <div>
        <IconButton aria-label="UpVote" onClick={props.handleUpVote}>
          <ThumbUpIcon fontSize="small" color="secondary" />
        </IconButton>
        <Typography>{props.voteScore}</Typography>
        <IconButton aria-label="DownVote" onClick={props.handleDownVote}>
          <ThumbDownIcon fontSize="small" color="error" />
        </IconButton>
      </div>
    </div>
  );
};

export default PostCardActions;
