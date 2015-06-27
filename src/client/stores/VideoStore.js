import {EventEmitter} from "events";
import querystring from "querystring";
import url from "url";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import assign from "object-assign";

let subreddits = [
    'tagpro'
]

let defaultQueryParams = {
    sort: 'top',
    t: 'week',
    q: ''
}

function fetchVideos(params={}) {

    let queryParams = assign(defaultQueryParams, params, {
        restrict_sr:'on'
    });

    queryParams['q'] = 'site:gfycat.com ' + queryParams['q'];

    let subreddit = subreddits.join('+');
    let qs = querystring.stringify(queryParams);
    let endpoint = `http://www.reddit.com/r/${subreddit}/search.json?${qs}`;

    let promise = $.getJSON(endpoint);
    promise.then((response) => {
        response.data.children.forEach(( child ) => {
            let post = child.data;
            parseGfycat(post);
        });
    });
}

function parseGfycat(post) {
    let pathname = url.parse(post.url).pathname;
    let gfycatId = pathname.replace('/', '');
    let endpoint = `http://gfycat.com/cajax/get/${gfycatId}`;

    let gfycat = $.getJSON(endpoint);
    gfycat.then((data) => {
        let result = {
            id: gfycatId,
            title: post.title,
            author: post.author,
            thumbnail:  `//thumbs.gfycat.com/${gfycatId}-poster.jpg`,
            small_thumbnail:  `//thumbs.gfycat.com/${gfycatId}-thumb100.jpg`,
            webm: data.gfyItem.webmUrl,
            mp4: data.gfyItem.mp4Url
        };

        _videos.push(result);
    });
}

let _videos = [];
let _activeVideo;

let VideoStore = assign({}, EventEmitter.prototype, {

    getAll: () => { return _videos; },
    getActiveVideo: () => { return _activeVideo; },
    getVideoById: (id) => {
        var value = undefined;
        _videos.some((video) => {
            if(video.id === id) {
                value = video;
                return true;
            }
        });
        return value;
    },
    fetchVideos: fetchVideos
});

AppDispatcher.register((action) => {

    switch(action.actionType) {
        case AppConstants.VIDEO_PLAY:
            _activeVideo = VideoStore.getVideoById(action.id);
            VideoStore.emit(AppConstants.VIDEO_PLAY);
            break;
        case AppConstants.ADD_VIDEO:
            _videos.push(action.item);
            VideoStore.emit('UPDATE_VIDEOS');
            break;
    }

})

export default VideoStore
