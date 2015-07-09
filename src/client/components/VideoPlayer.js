import React from "react";
import AppActions from "../actions/AppActions";

class VideoPlayer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      playCount: 0,
      maxPlays: 2
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.video !== this.props.video;
  }

  componentWillUpdate() {
    this.setState({playCount: 0});
  }

  componentDidMount() {
    let video = React.findDOMNode(this.refs.video);
    video.addEventListener('ended', this._onVideoEnded.bind(this));
    video.addEventListener('play', this._onPlay.bind(this));
    video.addEventListener('pause', this._onPause.bind(this));
  }

  componentWillUnmount() {
  }

  render () {
      let video = (
        <video id="video" autoPlay
          ref="video" data-videoid={this.props.video ? this.props.video.id : ""}
          src={ this.props.video ? this.props.video.webm : "" } >
        </video>
        )

    return (
      <div id="video-container">
        <div id="video-player">
          {video}
          <div id="video-controls">
            <button id="play-pause-button" type="button" onClick={this._onClickPlay.bind(this)}>
              <span className="glyphicon glyphicon-play"></span>
            </button>
            <input id="seek" type="range" />
            <button type="button" onClick={this._playPrev.bind(this)}>
              <span className="glyphicon glyphicon-step-backward"></span>
            </button>
            <button type="button" onClick={this._playNext.bind(this)}>
              <span className="glyphicon glyphicon-step-forward"></span>
            </button>
          </div>
        </div>
        <div id="video-description">
          <div className="video-title">
            { this.props.video.title }
          </div>
          by <a href="#">{this.props.video.author}</a>
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