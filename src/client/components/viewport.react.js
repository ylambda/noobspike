import React from "react";

class Viewport extends React.Component {

    render () {

        if(!this.props.video)
            return (<div id="viewport"></div>);

        return (
            <div id="viewport">
                <video 
                    id="viewport_video" 
                    autoPlay loop controls="true"
                    data-videoid={this.props.video.id}
                    src={ this.props.video.webm }
                >
                </video>
            </div>
        )
    }
}

export default Viewport
