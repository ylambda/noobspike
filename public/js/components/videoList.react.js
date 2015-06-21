import React from "react";
import VideoItem from "./videoItem.react";

class VideoList extends React.Component {

    render () {

        let videos = this.props.videos.map( (video) => {
            return <VideoItem video={video} />
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
