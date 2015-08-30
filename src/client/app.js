import React from "react";
import Router from "react-router";
let { Route, Link, DefaultRoute, NotFoundRoute, RouteHandler } = Router

import App from "./components/App";
import VideoListController from "./components/VideoListController";
import VideoDetailController from "./components/VideoDetailController";
import NotFoundController from "./components/NotFoundController";

let routes = (
  <Route path="/" handler={App} >
    <DefaultRoute handler={VideoListController} />
    <NotFoundRoute handler={NotFoundController} />
    <Route name="video-list" path="videos" handler={VideoListController} />
    <Route name="user-video-list" path="videos/u/:username" handler={VideoListController} />
    <Route name="video-detail" path="videos/:id" handler={VideoDetailController}/>
  </Route>
);

let AppRouter = Router.create({
  routes: routes,
  location: Router.HashLocation,
});

AppRouter.run((Root) => {
  React.render(<Root />, document.body);
});
