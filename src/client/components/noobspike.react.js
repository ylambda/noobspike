import React from "react";
import Viewport from "./viewport.react";
import VideoList from "./videoList.react";
import VideoStore from "../stores/VideoStore";
import AppConstants from "../constants/AppConstants";
import AppActions from "../actions/AppActions";

function getInitialState () {

    return {
        activeVideo: VideoStore.getActiveVideo(),
        videos: VideoStore.getAll()
    }
}

function updateState () {
    let subreddit = 'tagpro';
    let promise = $.getJSON(`http://www.reddit.com/r/${subreddit}.json`);
    promise.then((response) => {
        response.data.children.filter(( child ) => {
            let post = child.data;
            if (post.domain !== "gfycat.com")
                return;

            let splitUrl = post.url.split('/');
            let id = splitUrl[splitUrl.length - 1];

            let gfycat = $.getJSON(`http://gfycat.com/cajax/get/${id}`);
            gfycat.then((data) => {
                let result = {
                    id: id,
                    thumbnail:  `//thumbs.gfycat.com/${id}-poster.jpg`,
                    small_thumbnail:  `//thumbs.gfycat.com/${id}-thumb100.jpg`,
                    sources: {
                        webm: data.gfyItem.webmUrl,
                        mp4: data.gfyItem.mp4Url
                    }
                };

                AppActions.addItem(result)
            });
        });


    });
}

class NoobspikeApp extends React.Component {

    constructor (props) {
        super(props);
        this.state = getInitialState();
    }

    componentDidMount () {
        VideoStore.on(AppConstants.VIDEO_PLAY, this._playVideo.bind(this));
        VideoStore.on('UPDATE_VIDEOS', this._updateVideos.bind(this));
        updateState();
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

    _updateVideos () {
        let videos = VideoStore.getAll();
        console.log(videos);
        this.setState({ videos });
    }

}

export default NoobspikeApp
