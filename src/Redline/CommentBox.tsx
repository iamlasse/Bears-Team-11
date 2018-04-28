/* tslint:disable */
import * as React from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { Store } from '../types/Redux';
import { User } from '../types/User';
import { addComment, getComments } from '../actions/markerActions';
import axios from 'axios';

class CommentBox extends React.Component<
  {
    revisionId: string;
    markerId: string;
    user: User;
    comments: Array<{ user: string; time: string; message: string }>;
    addComment: any;
    getComments: any;
  },
  {
    message: string;
    comments: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      message: '',
      comments: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/projects/revision//markers/${
          this.props.markerId
        }/comments`
      )
      .then(response => {
        this.setState({
          comments: response.data.comments
        });
      });
  }

  handleInput = (e: any) => {
    var target = e.target;
    var value = target.value;
    console.log(value);
    this.setState({
      message: value
    });
  };
  handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which == 13) {
      // FIX ME: this should cause component to re-render because props should have been updated
      this.props.addComment(
        this.props.markerId,
        this.props.user.username,
        this.state.message
      );
    }
  };
  renderComments = () => {
    if (this.props.comments) {
      return this.state.comments.map((comment: any) => {
        return (
          <Comment
            key={comment._id}
            username={comment.creator}
            message={comment.comment}
            time={comment.createdAt}
          />
        );
      });
    }
    return null;
  };

  stopEvent = (e: any) => {
    e.stopPropagation();
  };

  render() {
    return (
      <div
        className="comment-box"
        style={{ display: 'none' }}
        onClick={this.stopEvent}
      >
        {this.renderComments()}
        <input
          className="comment-box__input"
          type="text"
          onKeyDown={this.handleKeyPress}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}

function mapStateToProps(state: Store, ownProps: any) {
  var comments;
  for (var i = 0; i < state.markers.length; i++) {
    if (state.markers[i]._id === ownProps.markerId) {
      comments = state.markers[i].comments;
    }
  }
  return {
    comments,
    markerId: ownProps.markerId,
    user: state.user
  };
}

export default connect(mapStateToProps, { addComment, getComments })(
  CommentBox
);
