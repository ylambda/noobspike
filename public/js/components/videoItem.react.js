import React from "react";
import AppActions from "../actions/AppActions";

class VideoItem extends React.Component {

  render () {

      return (
        <div className="col-md-2 col-xs-4">
            <div className="video-item">
                <img src={ this.props.video.small_thumbnail }
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
