import React from "react";
import {Link} from "react-router";
import AppActions from "../actions/AppActions";

class VideoItem extends React.Component {

  render () {

      return (
          <div className="video-item">
            <div className="thumbnail">
                <Link to="video-detail" params={{id: this.props.video.id}}>
                  <img src={ this.props.video.thumbnail} />
                    <div className="overlay" >
                        <div className="overlay-fg">{this.props.video.title}</div>
                        <div className="overlay-bg"></div>
                    </div>
                </Link>
            </div>
            <div className="detail">
                <div className="username">
                  <Link to="user-video-list" params={{username: this.props.video.author}}>
                     <span className={"flair flair-"+this.props.video.authorFlair}></span>
                        { this.props.video.author }
                    </Link>
                </div>
                <div className="stats">
                    <div className={"single-stat score"}>
                        <span className={"glyphicon glyphicon-arrow-up"}></span>
                        {this.props.video.score}
                    </div>
                    <div className={"single-stat views"}>
                        <span className={"glyphicon glyphicon-eye-open"}></span>
                        {this.props.video.views}
                    </div>
                </div>
            </div>
          </div>
      );
  }

  _handleClick() {
    AppActions.play(this.props.video.id);
  }
}

export default VideoItem
