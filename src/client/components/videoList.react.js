import React from "react";
import VideoItem from "./videoItem.react";

class VideoList extends React.Component {

    render () {

        let videos = this.props.videos.map( (video, key) => {
            return <VideoItem video={video} key={key} />
        });

        return (
            <div className="video-list">
                <div className="row">
                    { videos }
                </div>
            </div>
        );
    }
}

export default VideoList
