import React from "react";
import {Container} from "flux/utils";
import VideoStore from "../stores/VideoStore"
import VideoDetail from "./VideoDetail";
import AppConstants from "../constants/AppConstants";
import AppActions from "../actions/AppActions";

class VideoDetailController extends React.Component {

  constructor (props) {
    super(props);
    this.fetchVideo(props.params.id);
    this.state = this.calculateState();
  }

  calculateState () {
    return {
      playlist: VideoStore.getPlaylist(this.props.params.id),
      video: VideoStore.getVideo(this.props.params.id)
    }
  }

  componentDidMount () {
    VideoStore.on(AppConstants.VIDEO_DETAIL_UPDATE, this.change.bind(this));
    VideoStore.on(AppConstants.VIDEO_LIST_CHANGE, this.change.bind(this));

    if(this.state.playlist.length === 0) {
      AppActions.fetchVideos();
    }
  }

  componentWillUnmount () {
    VideoStore.removeListener(AppConstants.VIDEO_DETAIL_UPDATE, this.change.bind(this));
    VideoStore.removeListener(AppConstants.VIDEO_LIST_CHANGE, this.change.bind(this));
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.params.id !== this.props.params.id) {
      this.fetchVideo(nextProps.params.id);
    }
  }

  fetchVideo(id) {
    AppActions.fetchVideo(id);
  }

  change () {
    this.setState(this.calculateState());
  }

  render () {
    return <VideoDetail {...this.state} {...this.props} />
  }
}

export default VideoDetailController
