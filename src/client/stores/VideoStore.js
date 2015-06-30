import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import {EventEmitter} from "events";
import assign from "object-assign";

let _videos = [];
let _activeVideo = undefined;

let VideoStore = assign({}, EventEmitter.prototype, {
    getAll: () => { return _videos; },
    getActive: () => { return _activeVideo; },
    getById: (id) => {
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
            VideoStore.emit(AppConstants.VIDEO_UPDATE);
            break;
    }

})

export default VideoStore
