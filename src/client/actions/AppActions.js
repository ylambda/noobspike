import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import VideoStore from "../stores/VideoStore";
import querystring from "querystring";
import url from "url";
import assign from "object-assign";
import { getJSON } from "../utils";


let AppActions = {
    startApp: () => {
        AppDispatcher.dispatch({
            action: AppConstants.APP_START
        });
    },

    stopApp: () => {
        AppDispatcher.dispatch({
            action: AppConstants.APP_STOP
        });
    },

    updateFilter: (filter) => {
        AppDispatcher.dispatch({
            action: AppConstants.APP_UPDATE_FILTER,
            item: {type: 't', value: filter}
        });
    },

    fetchVideos: (params={}) => {
        let promise = fetchRedditSearchListing(params);
        promise.then(function(items) {
            AppDispatcher.dispatch({
                action: AppConstants.VIDEO_LIST_UPDATE,
                item: items
            });
        }).catch(function(err) { console.log(err) });

        AppDispatcher.dispatch({
            action: AppConstants.VIDEO_LIST_LOADING
        });

    },

    fetchVideo: (video) => {
        let promise = fetchRedditThread(video);
        promise.then((items) => {
            AppDispatcher.dispatch({
                action: AppConstants.VIDEO_DETAIL_UPDATE,
                item: items[0]
            });
        }).catch((err) => { console.log(err); });
    },

    updateVideo: (item) => {
        AppDispatcher.dispatch({
            action: AppConstants.VIDEO_UPDATE,
            item: item
        });
    }
}

export default AppActions


let subreddits = ['tagpro'];
let defaultParams = { sort: 'top', t: 'week', q: '', }
function fetchRedditSearchListing(params={}) {
    
    // Force restrict to specified subreddit
    let queryParams = assign(defaultParams, params, {restrict_sr:'on'});

    // For now only allow gfycat
    queryParams['q'] = 'site:gfycat.com ' + queryParams['q'];

    let subreddit = subreddits.join('+');
    let qs = querystring.stringify(queryParams);
    let endpoint = `https://www.reddit.com/r/${subreddit}/search.json?${qs}`;

    let promise = getJSON(endpoint);
    return promise.then(parseRedditListing)
}

function parseRedditListing(response) {
    let promises = [];
    response.data.children.forEach(( child ) => {
        let redditPost = child.data;
        let video = VideoStore.getVideo(redditPost.id);
        if(!video || shouldFetchDetails(video)) {
            promises.push(fetchGfycatDetail(redditPost));
        } else {
            promises.push(Promise.resolve(video))
        }
    });

    return Promise.all(promises);
}

function fetchRedditThread(thread_id) {
    let subreddit = subreddits.join('+');
    let endpoint = `https://www.reddit.com/r/${subreddit}/comments/${thread_id}.json`;

    let promise = getJSON(endpoint);
    promise = promise.then((data) => { return data[0]; });
    return promise.then(parseRedditListing);
}

function shouldFetchDetails(video) {
    let maxAge = 3600;
    let age = Date.now() - video.fetch_timestamp;
    return age >= maxAge
}

function fetchGfycatDetail(redditPost) {
    let pathname = url.parse(redditPost.url).pathname;
    let gfycatId = pathname.replace('/', '');
    let endpoint = `http://gfycat.com/cajax/get/${gfycatId}`;

    let promise = getJSON(endpoint)
        .then((data) => {
        let result = {
            id: redditPost.id,
            video_id: gfycatId,
            title: redditPost.title,
            author: redditPost.author,
            thumbnail:  `//thumbs.gfycat.com/${gfycatId}-poster.jpg`,
            small_thumbnail:  `//thumbs.gfycat.com/${gfycatId}-thumb100.jpg`,
            webm: data.gfyItem.webmUrl,
            mp4: data.gfyItem.mp4Url,
            score: redditPost.score,
            views: data.gfyItem.views
        };

        AppActions.updateVideo(result);
        return result;
    })

    return promise;
}
