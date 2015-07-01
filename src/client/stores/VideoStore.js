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
    }
});

AppDispatcher.register((action) => {

    switch(action.actionType) {
        case AppConstants.VIDEO_PLAY:
            _activeVideo = VideoStore.getById(action.id);
            VideoStore.emit(AppConstants.VIDEO_PLAY);
            break;
        case AppConstants.VIDEO_ADD:
            _videos.push(action.item);
            VideoStore.emit(AppConstants.VIDEO_UPDATE);
            if(_videos.length === 1) {
                _activeVideo = _videos[0];
                VideoStore.emit(AppConstants.VIDEO_PLAY);
            }
            break;
        case AppConstants.VIDEO_NEXT:
            var index = _videos.indexOf(_activeVideo) + 1;
            _activeVideo = _videos[index % _videos.length];
            VideoStore.emit(AppConstants.VIDEO_PLAY);
            break;
        case AppConstants.VIDEO_PREV:
            var index = _videos.indexOf(_activeVideo) - 1;
            _activeVideo = _videos[index % _videos.length];
            VideoStore.emit(AppConstants.VIDEO_PLAY);
            break;
    }

})

export default VideoStore
