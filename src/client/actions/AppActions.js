import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import VideoStore from "../stores/VideoStore";
import querystring from "querystring";
import url from "url";
import assign from "object-assign";
import { getJSON } from "../utils";

function logError (err) {
  console.error(err.stack);
}

let AppActions = {
    fetchVideos: (params={}) => {

        if(params.t) {
          AppDispatcher.dispatch({
            action: AppConstants.FILTER_CHANGE,
            item: {type: 't', value: params.t}
          });
        }

        let promise = fetchRedditSearchListing(params);
        promise.then(function(items) {
            AppDispatcher.dispatch({
                action: AppConstants.VIDEO_LIST_CHANGE,
                item: items
            });
        }).catch(logError);
    },

    fetchVideo: (video) => {
        let promise = fetchRedditThread(video);
        promise.then((items) => {
            AppDispatcher.dispatch({
                action: AppConstants.VIDEO_DETAIL_UPDATE,
                item: items[0]
            });
        }).catch(logError);
    },

    updateVideo: (item) => {
        AppDispatcher.dispatch({
            action: AppConstants.VIDEO_UPDATE,
            item: item
        });
    }
}

export default AppActions


let { default_filter, subreddits, listing_length } = VideoStore.getSettings();
function fetchRedditSearchListing(params={}) {

    // Force restrict to specified subreddit
    let queryParams = assign({}, default_filter, params, {restrict_sr:'on'});

    // For now only allow gfycat
    queryParams['q'] = 'site:gfycat.com ' + queryParams['q'];
    queryParams['limit'] = listing_length;

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

    let promise = Promise.all(promises);
    promise = promise.then((items) => {
      return {
        items: items.filter(item => { return item !== null }),
        before: response.data.before,
        after: response.data.after,
      }
    });

    return promise;
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
            if(data.error) {
                return null;
            }
        console.log(redditPost.author_flair_css_class);
        let result = {
            id: redditPost.id,
            video_id: gfycatId,
            title: redditPost.title,
            author: redditPost.author,
            authorFlair: redditPost.author_flair_css_class,
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
