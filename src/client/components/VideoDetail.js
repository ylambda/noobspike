import React from "react";
import {Link} from "react-router";
import VideoPlayer from "./VideoPlayer";

class VideoDetail extends React.Component {

    render() {

        let videos = this.props.videos.map( (video, key) => {
            return (
                <div className="col-xs-12" key={video.id}>
                  <div className="playlist-item">
                    <Link to="video-detail" params={{id: video.id}}>
                      <img src={ video.small_thumbnail} style={{width: "100px"}}/>
                      <div className="detail">
                        <div className="title">
                          { video.title }
                        </div>
                        <div className="username">
                          <Link to="user-video-list" params={{username: video.author}}>
                             <span className={"flair flair-"+video.authorFlair}></span>
                                { video.author }
                            </Link>
                        </div>
                        <div className="stats">
                          <div className={"single-stat score"}>
                            <span className={"glyphicon glyphicon-arrow-up"}></span>
                            {video.score}
                          </div>
                          <div className={"single-stat views"}>
                            <span className={"glyphicon glyphicon-eye-open"}></span>
                            {video.views}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
            );
        });

        let videoPlayer;
        if (this.props.video) {
          videoPlayer = <VideoPlayer video={this.props.video} />
        }

        return (
          <div id="view__video-detail">
              <div className="row">
                <div className="col-xs-9">
                   { videoPlayer }
                    <div className="video-detail">
                        <div className={"video-score"}
                             title={`${this.props.video.score} upvotes`}>
                            { this.props.video.score }
                        </div>
                        <div className={"video-description"}>
                          <div className="video-title ">
                            { this.props.video.title }
                          </div>
                          by <Link to="user-video-list" params={{username: this.props.video.author}}>
                             { this.props.video.author }
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-xs-3">
                    { videos }
                </div>
              </div>
          </div>
        )
    }
}

export default VideoDetail
