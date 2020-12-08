import { ActionStore } from "../../types";
import { ADD_FOLDER, UPDATE_FOLDER, DELETE_FOLDER,
    UPDATE_BY_API, UPDATE_MODULE_IN_FOLDER }
from '../actions/folderActions';

const initialFolderState = {list: [] as any, totalFolders: 0, modules: [], totalModules: 0}

const folderReducer = (state = initialFolderState, action: ActionStore) => {
    switch(action.type) {
        case ADD_FOLDER:
            const total = state.totalFolders + 1;
            return {...state, list: [...state.list, action.payload], totalFolders: total};
        case UPDATE_FOLDER:
            const listClone = state.list;
            listClone.map((folder: any, index: number) => {
                if (folder.id == action.payload.id) {
                    listClone[index] = action.payload
                }
            })
            return {...state, list: listClone};
        case DELETE_FOLDER:
            return {...state, ...{list: action.payload}, totalFolders: action.payload.length};
        case UPDATE_BY_API:
            return {...state, ...{list: action.payload}, totalFolders: action.payload.length};
        case UPDATE_MODULE_IN_FOLDER:
            return {...state, ...{modules: action.payload}, totalModules: action.payload?.length}
        default:
            return state;
    }
}
export default folderReducer;