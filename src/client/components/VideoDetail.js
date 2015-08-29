import React from "react";
import {Link} from "react-router";
import VideoPlayer from "./VideoPlayer";
import VideoPlaylist from "./VideoPlaylist";

class VideoDetail extends React.Component {

    render() {
      return (
        <div id="video-detail-view">
          <div className="row">
            <div className="col-sm-8 col-xs-12">
              <VideoPlayer video={this.props.video} />
              <div className="video-detail">
                <div className={"video-score"} title={`${this.props.video.score} upvotes`}>
                  { this.props.video.score }
                </div>
                <div className="video-description">
                  <div className="video-title">
                    { this.props.video.title }
                  </div>
                  by <Link to="user-video-list" params={{username: this.props.video.author}}>
                   { this.props.video.author }
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-xs-12">
              <VideoPlaylist items={this.props.playlist} />
            </div>
          </div>
        </div>
      );
    }
}

export default VideoDetail
