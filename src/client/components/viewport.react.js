import React from "react";

class Viewport extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount () {
        let video = document.getElementById("viewport_video");
        video.addEventListener("canplay", ( event ) => {
            video.play();
        });
    }

    render () {

        let source = this.props.video.sources.webm

        return (
            <div id="viewport">
                <video 
                    id="viewport_video" 
                    autoplay loop controls="true"
                    data-videoid={this.props.video.id}
                    src={ source }
                >
                </video>
            </div>
        )
    }
}

export default Viewport
