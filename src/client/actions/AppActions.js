import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";

let AppActions = {
    play: (id) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.VIDEO_PLAY,
            id: id
        });
    },

    addItem: (item) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_VIDEO,
            item: item
        });
    }
}

export default AppActions
