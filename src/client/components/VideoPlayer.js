import React from "react";
import {Link} from "react-router";
import AppActions from "../actions/AppActions";

class VideoPlayer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      playCount: 0,
      maxPlays: 2,
      overlay: "visible"
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.video !== this.props.video;
  }

  componentWillUpdate() {
    this.setState({
      playCount: 0
    });
  }

  componentDidMount() {
    let video = React.findDOMNode(this.refs.video);
    video.addEventListener('ended', this._onVideoEnded.bind(this));
    video.addEventListener('play', this._onPlay.bind(this));
    video.addEventListener('pause', this._onPause.bind(this));
  }

  render () {

      let video = (
        <video id="video" loop="true" autoPlay="true" onClick={this._onClickPlay.bind(this)}
          ref="video" poster={this.props.video.thumbnail}>
          <source src={this.props.video.webm} type="video/webm" />
          <source src={this.props.video.mp4} type="video/mp4" />
        </video>
        )

    return (
      <div id="video-container">
        <div id="video-player">
          {video}
          <div id="video-controls" className="text-left">
            <button id="play-pause-button" type="button">
              <span className="glyphicon glyphicon-play"></span>
            </button>
            {/*
            <button type="button" onClick={this._playPrev.bind(this)}>
              <span className="glyphicon glyphicon-step-backward"></span>
            </button>
            <button type="button" onClick={this._playNext.bind(this)}>
              <span className="glyphicon glyphicon-step-forward"></span>
            </button>
            */}
          </div>
        </div>
      </div>
    )
  }

  _onVideoEnded () {
    this.setState({playCount: this.state.playCount+1});

    if (this.state.playCount >= this.state.maxPlays) {
      return this._playNext();
    }

    let video = React.findDOMNode(this.refs.video);
    video.play();
  }

  _playPrev (event) {
    if (!document.hidden) {
      AppActions.playPrev();
    }
  }

  _onCanPlay (event) {
    let video = this.refs.video.getDOMNode();
    video.play();
  }

  _playNext (event) {
    if (!document.hidden) {
      AppActions.playNext();
    }
  }

  _onClickPlay (event) {
    let video = this.refs.video.getDOMNode();

    if (video.paused) {
      return video.play();
    }

    return video.pause();
  }

  _onPlay () {
    let buttonIcon = document.getElementById("play-pause-button").children[0];
    buttonIcon.classList.remove('glyphicon-play');
    buttonIcon.classList.add('glyphicon-pause');

  }

  _onPause() {
    let buttonIcon = document.getElementById("play-pause-button").children[0];
    buttonIcon.classList.remove('glyphicon-pause');
    buttonIcon.classList.add('glyphicon-play');
  }
}

export default VideoPlayer
