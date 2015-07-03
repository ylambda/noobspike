import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import querystring from "querystring";
import url from "url";
import assign from "object-assign";

let AppActions = {
    play: (id) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.VIDEO_PLAY,
            id: id
        });
    },

    playNext: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.VIDEO_NEXT
        });
    },

    playPrev: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.VIDEO_PREV
        });
    },

    fetchVideos: () => {
        fetchVideos();
    },

    addItem: (item) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.VIDEO_ADD,
            item: item
        });
    }

    changeSearchOptions: (name, value) {
        defaultQueryParams[name] = value;
        fetchVideos();
    }
}

export default AppActions


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

        AppActions.addItem(result);
    });
}
