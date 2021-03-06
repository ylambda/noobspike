import "babel/polyfill";
import React from "react";
import {Link, State} from "react-router";
import VideoItem from "./VideoItem";
import VideoStore from "../stores/VideoStore";
import DropdownMenu from "./DropdownMenu";
import assign from "object-assign";

let time_filters = new Map([
  ["hour", "Hour"],
  ["day", "24 hours"],
  ["week", "Week"],
  ["month","Month"],
  ["year", "Year"],
  ["all", "All"],
]);


class VideoList extends React.Component {

  getTimeItems () {
    let query = this.props.query;
    let params = this.props.params;

    let items = {};
    for(let [key, value] of time_filters) {
      let filter = items[key] = {};
      filter.label = value;
      filter.to = 'video-list';
      filter.query = assign({}, query, {t: key, before: undefined, after: undefined});
      filter.params = params;
    }

    return items;
  }

  getTimeLabel () {
    return time_filters.get(this.props.time_filter);
  }

  render () {

    let time_dropdown = <DropdownMenu items={this.getTimeItems()} label={this.getTimeLabel()} />

    let videos = this.props.videos.map( (video, key, index) => {
      return <VideoItem video={video} key={video.id} />
    });

    let next;
    let before;

    // Add next option
    if (this.props.pagination.after) {

      let query = assign({}, this.props.query, {
        after: this.props.pagination.after,
        before: undefined
      });

      next = (
          <Link className={"btn btn-default"} to="video-list" query={query}>
            Next
          </Link>
      );
    }

    // Add before option
    if (this.props.pagination.before) {

      let query = assign({}, this.props.query, {
        before: this.props.pagination.before,
        after: undefined
      });

      before = (
          <Link className={"btn btn-default"} to="video-list" query={query}>
            Before
          </Link>
      );
    }

    return (
      <div className="video-list">
        <div className="filters">
          <div className="row">
            <div className="col-xs-12">
              { this.props.params.username ? undefined : time_dropdown }
            </div>
          </div>
        </div>
        <div className="row">
          { videos }

          <div className="col-xs-12">
            { before }
            { next }
          </div>

        </div>
      </div>
    );
  }

}

export default VideoList
