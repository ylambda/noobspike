import React from "react";
import {Link} from "react-router";
import VideoPlayer from "./VideoPlayer";
import VideoItem from "./VideoItem";
import VideoStore from "../stores/VideoStore";
import AppConstants from "../constants/AppConstants";
import AppActions from "../actions/AppActions";

class VideoDetail extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            video: VideoStore.getVideo(props.params.id),
            videos: VideoStore.getAll()
        }
    }

    componentDidMount () {
        VideoStore.on(AppConstants.VIDEO_DETAIL_UPDATE, this._changeVideo.bind(this));
        VideoStore.on(AppConstants.VIDEO_LIST_UPDATE, this._changeVideos.bind(this));
        if(!this.state.video) {
            let video = this.props.params.id;
            AppActions.fetchVideo(video);
        }

        if(!this.state.videos.length) {
            AppActions.fetchVideos();
        }

    }

    componentWillReceiveProps (nextProps) {

        let videos = VideoStore.getAll();
        let videoIndex = videos.find(video => video.id == nextProps.params.id);

        this.setState({
            video: VideoStore.getVideo(nextProps.params.id),
            videos: videos.slice(videoIndex+1, 4)
        });
    }

    componentWillUnmount () {
        VideoStore.removeListener(AppConstants.VIDEO_DETAIL_UPDATE, this._changeVideo.bind(this));
        VideoStore.removeListener(AppConstants.VIDEO_LIST_UPDATE, this._changeVideos.bind(this));
    }

    render() {

        let videos = this.state.videos.map( (video, key) => {
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
        if (this.state.video) {
          videoPlayer = <VideoPlayer video={this.state.video} />
        }

        return (
          <div id="view__video-detail">
              <div className="row">
                <div className="col-xs-9">
                   { videoPlayer }
                    <div className="video-detail">
                        <div className={"video-score"}
                             title={`${this.state.video.score} upvotes`}>
                            { this.state.video.score }
                        </div>
                        <div className={"video-description"}>
                          <div className="video-title ">
                            { this.state.video.title }
                          </div>
                          by <Link to="user-video-list" params={{username: this.state.video.author}}>
                             { this.state.video.author }
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

    _changeVideo (video) {
        this.setState({video: video});
    }

    _changeVideos (videos) {
        this.setState({videos: VideoStore.getAll()});
    }
}

export default VideoDetail
