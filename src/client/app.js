require('babel/polyfill');
import React from "react";
import Router from "react-router";
var { Route, Link, DefaultRoute, NotFoundRoute, RouteHandler } = Router

import App from "./components/App";
import VideoDetail from "./components/VideoDetail";
import VideoList from "./components/VideoList";


var NotFound = React.createClass({
  render () {
    return (
      <div>
        <h4>Not Found</h4>
      </div>
    )
  }
});

var VideoListWrapper = React.createClass({
  render () {
    return (<VideoList {...this.props} />)
  }
});

var VideoDetailWrapper = React.createClass({
  render () {
    return (<VideoDetail {...this.props} />)
  }
});

var routes = (
    <Route path="/" handler={App} >
        <DefaultRoute handler={VideoListWrapper} />
        <NotFoundRoute handler={NotFound} />
        <Route name="video-list" path="videos" handler={VideoListWrapper} />
        <Route name="user-video-list" path="videos/u/:username" handler={VideoListWrapper} />
        <Route name="video-detail" path="videos/:id" handler={VideoDetailWrapper} />
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.body);
});
