import React from "react";
import VideoStore from "../stores/VideoStore"
import VideoList from "./VideoList";
import AppConstants from "../constants/AppConstants";
import AppActions from "../actions/AppActions";
import assign from "object-assign";

class VideoListController extends React.Component {

  constructor (props) {
    super(props);
    this.fetchVideos(props.query, props.params);
    this.state = this.calculateState();
  }

  calculateState (nextProps) {
    return {
      videos: VideoStore.getAll(),
      time_option: 'week'
    }
  }

  componentDidMount () {
    VideoStore.on(AppConstants.VIDEO_LIST_CHANGE, this.change.bind(this));
  }

  componentWillUnmount () {
    VideoStore.removeListener(AppConstants.VIDEO_LIST_CHANGE, this.change.bind(this));
  }

  componentWillReceiveProps (nextProps) {
    this.fetchVideos(nextProps.query, nextProps.params);
  }

  change () {
    this.setState(this.calculateState());
  }

  fetchVideos (query, params) {

    let filter = {
      'sort': query.sort,
      't': query.t,
      'author': params.username,
    }

    AppActions.fetchVideos(filter);
  }


  render () {
    return <VideoList {...this.props} {...this.state} />
  }

}

export default VideoListController
