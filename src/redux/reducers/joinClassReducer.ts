import { GET_JOINED_CLASS } from '../actions/joinClassAction';
import { ActionStore } from "../../types";

const initialState = {
    list: [] as any, totalJoined: 0
}

const joinClassReducer = (state = initialState, action: ActionStore) => {
    switch(action.type) {
        case GET_JOINED_CLASS:
            return {...state, list: action.payload, totalJoined: action.payload.length};
        default:
            return state;
    }
}
export default joinClassReducer;