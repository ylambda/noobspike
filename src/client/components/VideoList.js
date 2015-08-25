import React from "react";
import {Link, State} from "react-router";
import VideoItem from "./VideoItem";
import AppActions from "../actions/AppActions";
import VideoStore from "../stores/VideoStore";
import AppConstants from "../constants/AppConstants";
import assign from "object-assign";

let defaultQuery = { sort: 'top', t: 'all', q: '' }
let options = {
    time: {
        "hour": "Hour",
        "day": "24 hours",
        "week": "Week",
        "month": "Month",
        "year": "Year",
        "all": "All"
    }
}

class VideoList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {videos: []};
    }

    componentDidMount () {
        VideoStore.on(AppConstants.VIDEO_LIST_UPDATE, this._onChange.bind(this));
        let query = assign({}, defaultQuery, this.props.query);
        let router = this.context.router;
        let username = router.getCurrentParams().username;

        this._fetchVideos(query, username);

    }

    componentWillUnmount () {
        VideoStore.removeListener(AppConstants.VIDEO_LIST_UPDATE, this._onChange.bind(this));
    }

    componentWillReceiveProps (nextProps) {
        let query = assign({}, defaultQuery, nextProps.query);
        let router = this.context.router;
        let username = router.getCurrentParams().username;

        this._fetchVideos(query, username);
    }

    render () {

        let router = this.context.router;
        let params = router.getCurrentParams();
        let qs = router.getCurrentQuery();

        let time_dropdown_items = Object.keys(options.time).map((key) => {
            let item = options.time[key];
            let query = assign({}, qs, {t: key});

            return (
                <li data-value={item.value}>
                    <Link to="video-list" params={params} query={query} >{ item }</Link>
                </li>
            );
        });

        let active_label = options.time[qs.t || defaultQuery.t]

        let time_dropdown = (
            <div className="btn-group">
              <button type="button" className={"btn btn-default dropdown-toggle"}
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { active_label }
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                 {time_dropdown_items}
              </ul>
            </div>
        );

        let videos = this.state.videos.map( (video, key) => {
            return (
            <div className="col-md-4 col-sm-6 col-xs-12">
                <VideoItem video={video} key={key} />
            </div>
            );
        });

        return (
            <div className={"video-list"}>
                <div className="filters">
                    <div className="row">
                        <div className="col-xs-12">
                            { time_dropdown }
                        </div>
                    </div>
                </div>
                <div className="row">
                    { videos }
                </div>
            </div>
        );
    }

    _onChange () {
        let videos = VideoStore.getAll();
        this.setState({videos: videos, loading: false});
    }

    _fetchVideos(query, username) {

        // filter by username
        if (username) {
            query['q'] += ` author:${username}`;
            query['t'] = 'all';
        }

        AppActions.fetchVideos(query);
    }
}

VideoList.contextTypes = {
    router: React.PropTypes.func
}

export default VideoList
