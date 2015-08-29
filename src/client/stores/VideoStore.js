import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import {EventEmitter} from "events";
import assign from "object-assign";

// Videos stored by id
let videoItems = {};
let videoList = [];
let timeFilter = 'all';

class VideoStore extends EventEmitter {

    getVideo (id) {
        return videoItems[id];
    }

    getAll () {
        return videoList;
    }

    getTimeFilter () {
        return timeFilter;
    }

    getPlaylist (id) {

      let playlistSize = 10;
      let playlist = this.getAll();

      playlist = playlist.filter((video => video.id !== id));
      playlist = playlist.slice(0, playlistSize);

      return playlist;
    }
}

let video_store = new VideoStore();

// parse json with a default value
function parseJSON(json, defaultValue) {
    return (json ? JSON.parse(json) : defaultValue);
}

videoItems = parseJSON(sessionStorage.getItem('videoItems'), {});

// Save all videos to session storage before leaving
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('videoItems', JSON.stringify(videoItems));
});


AppDispatcher.register((action) => {

    switch(action.action) {

        case AppConstants.VIDEO_UPDATE:
            videoItems[action.item.id] = action.item;
            video_store.emit(AppConstants.VIDEO_UPDATE);
            break;

        case AppConstants.VIDEO_LIST_CHANGE:
            console.log('video list change');
            videoList = action.item;
            video_store.emit(AppConstants.VIDEO_LIST_CHANGE);
            break;

        case AppConstants.APP_UPDATE_FILTER:
            if(action.item.type === 't') {
                timeFilter = action.item.value;
            }
            break;

        case AppConstants.VIDEO_DETAIL_UPDATE:
            video_store.emit(AppConstants.VIDEO_DETAIL_UPDATE, action.item);
            break;

        case AppConstants.VIDEO_LIST_LOADING:
            videoList = [];
            video_store.emit(AppConstants.VIDEO_LIST_UPDATE);
            break;

    }

})

export default video_store;
