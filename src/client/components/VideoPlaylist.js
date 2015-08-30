import React from "react";
import {Link} from "react-router";

class VideoPlaylist extends React.Component {

  render () {
        let items = this.props.items.map( (video, key) => {
          return (
            <li className="playlist-item" key={video.id}>
              <div className="thumbnail-container">
                <Link to="video-detail" params={{id: video.id}}>
                  <img className="thumbnail" src={video.small_thumbnail}/>
                </Link>
              </div>
              <div className="detail">
                <Link to="video-detail" params={{id: video.id}}>
                  <div className="title" dangerouslySetInnerHTML={{__html:video.title}} ></div>
                  <div className="username">
                    by { video.author }
                  </div>
                  <div className={"single-stat score"}>
                    <span className={"glyphicon glyphicon-arrow-up"}></span>
                    {video.score}
                  </div>
                  <div className={"single-stat views"}>
                    <span className={"glyphicon glyphicon-eye-open"}></span>
                    {video.views}
                  </div>
                </Link>
              </div>
            </li>
          );
        });

        return (
          <ul className="video-playlist">
            { items }
          </ul>
        );
  }
}

VideoPlaylist.defaultProps = { items: [] };

export default VideoPlaylist;
