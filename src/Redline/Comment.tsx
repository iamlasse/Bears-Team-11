import * as React from 'react';

class Comment extends React.Component {
  render() {
    return (
      <div className="comment-box__comment">
        <img
          className="comment-box__profile_picture"
          src="https://stroops.com/wp-content/uploads/2016/11/placeholder-profile-male-500x500.png"
          alt=""
        />
        <div>
          <p className="comment-box__name">
            natapot <span className="comment-box__timestamp">8:00am</span>
          </p>
          <p className="comment-box__body">
            Dislike Kaiju, please make it more cool.
          </p>
        </div>
      </div>
    );
  }
}

export default Comment;
