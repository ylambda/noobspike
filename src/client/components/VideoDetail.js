import React from "react";
import {Link} from "react-router";
import VideoPlayer from "./VideoPlayer";
import VideoPlaylist from "./VideoPlaylist";

class VideoDetail extends React.Component {

    render() {

      // temp fix; should show loading screen or 404
      // when there is no video
      if (!this.props.video)
          return (<div>Loading</div>);

      return (
        <div id="video-detail-view">
          <div className="row">
            <div className="col-sm-8 col-xs-12">
              <VideoPlayer video={this.props.video} />
              <div className="video-detail">
                <div className="stats">
                  <div className={"single-stat score"} title={`${this.props.video.score} upvotes`}>
                    <span className={"glyphicon glyphicon-arrow-up"}></span>
                    { this.props.video.score }
                  </div>
                  <div className={"single-stat views"} title={`${this.props.video.views} views`}>
                    <span className={"glyphicon glyphicon-eye-open"}></span>
                    { this.props.video.views }
                  </div>
                </div>
                <div className="description">
                  <div className="video-title">
                    { this.props.video.title }
                  </div>
                  <Link to="user-video-list" params={{username: this.props.video.author}}>
                   <span className={"flair flair-"+this.props.video.authorFlair}></span>
                   { this.props.video.author }
                  </Link>
                </div>
                <div className="clearfix"></div>
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
