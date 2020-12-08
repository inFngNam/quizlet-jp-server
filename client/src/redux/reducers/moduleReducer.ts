import { ActionStore } from '../../types';
import { ALL_MODULES, CREATE_MODULE, DELETE_MODULE, EDIT_MODULE } from './../actions/moduleAction';

const initialModuleState = {list: [] as any, total: 0}

const moduleReducer = (state = initialModuleState, action: ActionStore) => {
    switch(action.type) {
        case ALL_MODULES:
            return {...state, ...{list:  action.payload}, total: action.payload.length};
        case CREATE_MODULE:
            const totalClone = state.total + 1
            return {...state, list: [...state.list, action.payload], total: totalClone};
        case DELETE_MODULE:
            return {...state, list: action.payload};
        case EDIT_MODULE: 
        console.log(action.payload) ;
        const listClone = state.list;
        listClone.map((module: any, index: number) => {
            if (module.id === action.payload.id) {
                listClone[index] = action.payload
            }
        })
        return {...state, list: listClone};
        default:
            return state;
    }
}
export default moduleReducer;