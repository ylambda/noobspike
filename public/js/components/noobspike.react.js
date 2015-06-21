import React from "react";
import Viewport from "./viewport.react";
import VideoList from "./videoList.react";
import VideoStore from "../stores/VideoStore";
import AppConstants from "../constants/AppConstants";

function getInitialState () {
    return {
        activeVideo: VideoStore.getActiveVideo(),
        videos: VideoStore.getAll()
    }
}

class NoobspikeApp extends React.Component {

    constructor (props) {
        super(props);
        this.state = getInitialState();
    }

    componentDidMount () {
        VideoStore.on(AppConstants.VIDEO_PLAY, this._playVideo.bind(this));
    }

    componentDidUnmount () {
        VideoStore.removeListener(AppConstants.VIDEO_PLAY, this._playVideo);
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

}

export default NoobspikeApp
