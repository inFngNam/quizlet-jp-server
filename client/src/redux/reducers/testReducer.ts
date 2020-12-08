import {ActionStore} from '../../types';
import {ALL_TEST, CHECK_TEST} from "../actions/testActions";

const initialModuleState = {list: [] as any, total: 0}

const testReducer = (state = initialModuleState, action: ActionStore) => {
    switch (action.type) {
        case ALL_TEST:
            return {...state, ...{list: action.payload}, total: action.payload.length};
        case CHECK_TEST:
            const totalClone = state.total + 1
            return {...state, list: state.list, score: action.payload, total: totalClone};
        default:
            return state;
    }
}
export default testReducer;
