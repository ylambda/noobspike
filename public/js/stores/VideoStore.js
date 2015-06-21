import {EventEmitter} from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import assign from "object-assign";

import _videos from "../fixtures/videos.json";

let _activeVideo = _videos[0];

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
    }


});

AppDispatcher.register((action) => {

    switch(action.actionType) {
        case AppConstants.VIDEO_PLAY:
            _activeVideo = VideoStore.getVideoById(action.id);
            VideoStore.emit(AppConstants.VIDEO_PLAY);
            break;
    }

})

export default VideoStore
