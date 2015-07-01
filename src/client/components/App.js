import React from "react";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";
import VideoStore from "../stores/VideoStore";
import AppConstants from "../constants/AppConstants";
import AppActions from "../actions/AppActions";

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            activeVideo: VideoStore.getActive(),
            videos: VideoStore.getAll()
        }
    }

    componentDidMount () {
        VideoStore.on(AppConstants.VIDEO_PLAY, this._playVideo.bind(this));
        VideoStore.on(AppConstants.VIDEO_UPDATE, this._updateVideos.bind(this));
        AppActions.fetchVideos();
    }

    componentDidUnmount () {
        VideoStore.removeListener(AppConstants.VIDEO_PLAY, this._playVideo);
        VideoStore.removeListener(AppConstants.VIDEO_UPDATE, this._updateVideos);
    }

    render () {
        let videoPlayer;
        if (this.state.activeVideo) {
          videoPlayer = <VideoPlayer video={this.state.activeVideo} />
        }

        return (
            <div id="app">
                {videoPlayer}
                <VideoList videos={this.state.videos} />
            </div>
        );
    }

    _playVideo () {
        let activeVideo = VideoStore.getActive();
        this.setState({ activeVideo });
    }

    _updateVideos () {
        let videos = VideoStore.getAll();
        this.setState({ videos });
    }

}

export default App
