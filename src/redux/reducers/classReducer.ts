import { ActionStore } from "../../types";
import {
  ADD_CLASS, DELETE_CLASS, UPDATE_CLASS,
  UPDATE_CLASSES_BY_API, UPDATE_MODULE_IN_CLASS,
  UPDATE_FOLDER_IN_CLASS
 } from "../actions/classActions";

const initialClassState = {
  list: [] as any,totalClasses: 0,
  modules: [], totalModules: 0,
  folders: [], totalFolders: 0
}

const classReducer = (state = initialClassState, action: ActionStore) => {
  switch (action.type) {
    case ADD_CLASS:
      const total = state.totalClasses + 1;
      return { ...state, list: [...state.list, action.payload], totalClasses: total };
    case UPDATE_CLASS:
      const listClone = state.list;
      listClone.map((class_: any, index: number) => {
        if (class_.id === action.payload.id) {
          listClone[index] = action.payload
        }
      })
      return { ...state, list: listClone };
    case DELETE_CLASS:
      return { ...state, ...{ list: action.payload }, totalClasses: action.payload.length };
    case UPDATE_CLASSES_BY_API:
      return { ...state, ...{ list: action.payload }, totalClasses: action.payload.length };
    case UPDATE_MODULE_IN_CLASS:
      return {...state, ...{modules: action.payload}, totalModules: action.payload.length}
    case UPDATE_FOLDER_IN_CLASS: {
      return {...state, ...{folders: action.payload}, totalFolders: action.payload.length}
    }
    default:
      return state;
  }
}
export default classReducer;