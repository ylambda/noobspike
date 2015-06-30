import React from "react";
import AppActions from "../actions/AppActions";

class VideoItem extends React.Component {

  render () {

      return (
        <div className="col-sm-4 col-xs-12">
            <div className="video-item">
                <img
                    src={ this.props.video.thumbnail}
                    onClick={this._handleClick.bind(this)}
                />
            </div>
        </div>
      );
  }

  _handleClick() {
    AppActions.play(this.props.video.id);
  }
}

export default VideoItem
