import {EventEmitter} from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import assign from "object-assign";

let _videos = [
    {
        id:  "SerpentineSpryEmperorpenguin",
        thumbnail: "//thumbs.gfycat.com/SerpentineSpryEmperorpenguin-poster.jpg",
        small_thumbnail: "//thumbs.gfycat.com/SerpentineSpryEmperorpenguin-thumb100.jpg",
        sources: {
            webm: "//giant.gfycat.com/SerpentineSpryEmperorpenguin.webm",
            mp4: "//giant.gfycat.com/SerpentineSpryEmperorpenguin.mp4"
        }
    },{
        id:  "temptingtotalarthropods",
        thumbnail: "//thumbs.gfycat.com/TemptingTotalArthropods-poster.jpg",
        small_thumbnail: "//thumbs.gfycat.com/TemptingTotalArthropods-thumb100.jpg",
        sources: {
            webm: "//giant.gfycat.com/TemptingTotalArthropods.webm",
            mp4: "//giant.gfycat.com/TemptingTotalArthropods.mp4"
        }
     },{
        id:  "UncommonColdBengaltiger",
        thumbnail: "//thumbs.gfycat.com/UncommonColdBengaltiger-poster.jpg",
        small_thumbnail: "//thumbs.gfycat.com/UncommonColdBengaltiger-thumb100.jpg",
        sources: {
            webm: "//giant.gfycat.com/UncommonColdBengaltiger.webm",
            mp4: "//giant.gfycat.com/UncommonColdBengaltiger.mp4"
        }
     },{
        id:  "NaughtyConstantCopperbutterfly",
        thumbnail: "//thumbs.gfycat.com/NaughtyConstantCopperbutterfly-poster.jpg",
        small_thumbnail: "//thumbs.gfycat.com/NaughtyConstantCopperbutterfly-thumb100.jpg",
        sources: {
            webm: "//zippy.gfycat.com/NaughtyConstantCopperbutterfly.webm",
            mp4: "//fat.gfycat.com/NaughtyConstantCopperbutterfly.mp4"
        }
      },{
        id:  "KnobbyNeglectedIndianelephant",
        thumbnail: "//thumbs.gfycat.com/KnobbyNeglectedIndianelephant-poster.jpg",
        small_thumbnail: "//thumbs.gfycat.com/KnobbyNeglectedIndianelephant-thumb100.jpg",
        sources: {
            webm: "//zippy.gfycat.com/KnobbyNeglectedIndianelephant.webm",
            mp4: "//fat.gfycat.com/KnobbyNeglectedIndianelephant.mp4"
        }
       },{
        id:  "ImpoliteHomelyAquaticleech",
        thumbnail: "//thumbs.gfycat.com/ImpoliteHomelyAquaticleech-poster.jpg",
        small_thumbnail: "//thumbs.gfycat.com/ImpoliteHomelyAquaticleech-thumb100.jpg",
        sources: {
            webm: "//zippy.gfycat.com/ImpoliteHomelyAquaticleech.webm",
            mp4: "http://fat.gfycat.com/ImpoliteHomelyAquaticleech.mp4"
        }
       }
]

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

    console.log(action, action.actionType);

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
