import React from "react";
import Viewport from "./Viewport.jsx";
import VideoList from "./VideoList.jsx";
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
        VideoStore.on(AppConstants.VIDEO_PLAY, this._playVideo);
        VideoStore.on(AppConstants.VIDEO_UPDATE, this._updateVideos);
        AppActions.fetchVideos();
    }

    componentDidUnmount () {
        VideoStore.removeListener(AppConstants.VIDEO_PLAY, this._playVideo);
        VideoStore.removeListener(AppConstants.VIDEO_UPDATE, this._updateVideos);
    }

    render () {
        return (
            <div id="app">
                <Viewport video={this.state.activeVideo} />
                <VideoList videos={this.state.videos} />
            </div>
        );
    }

    _playVideo () {
        let activeVideo = VideoStore.getActiveVideo();
        this.setState({ activeVideo });
    }

    _updateVideos () {
        let videos = VideoStore.getAll();
        this.setState({ videos });
    }

}

export default App
