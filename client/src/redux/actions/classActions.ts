import Axios from 'axios';
import {
  UpdateClassInput, CreateClassInput, ModuleCreate, CreateFolderInput,
} from '../../types';
import * as classService from '../../services/class/class.service';
import { CREATE_MODULE } from './moduleAction';
import { ADD_FOLDER } from './folderActions';

export const ADD_CLASS = "ADD_CLASS";
export const UPDATE_CLASS = "UPDATE_CLASS";
export const DELETE_CLASS = "DELETE_CLASS";
export const UPDATE_CLASSES_BY_API = "UPDATE_CLASSES_BY_API";
export const UPDATE_MODULE_IN_CLASS = "UPDATE_MODULE_IN_CLASS";
export const UPDATE_FOLDER_IN_CLASS = "UPDATE_FOLDER_IN_CLASS";

export const getListOfCLasses = (token: string) => {
  return async (dispatch: any) => {
    Axios.get(classService.LIST_CLASS.url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      dispatch({
        type: UPDATE_CLASSES_BY_API,
        payload: res.data
      })
    }).catch(e => {
      console.log(e)
    })
  }
}

export const createClass = (token: string, input: CreateClassInput, addToast: any) => {
  return async (dispatch: any) => {
    Axios.post(classService.CREATE_CLASS.url, input, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.data) {
          dispatch({
            type: ADD_CLASS,
            payload: res.data
          })
        }
        if (addToast) {
          addToast("Create class success", {
            appearance: "success",
            autoDismiss: true
          })
        }
      })
      .catch(e => {
        console.log(e)
        if (addToast) {
          addToast("Create class failed", {
            appearance: "error",
            autoDismiss: true
          })
        }
      })
  }
}

export const deleteClass = (token: string, class_id: number, addToast: any) => {
  return async (dispatch: any) => {
    Axios.delete(classService.DELETE_CLASS_API.url + `/${class_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch({
          type: DELETE_CLASS,
          payload: res.data
        })
        if (addToast) {
          addToast("Deleted class success", {
            appearance: "success",
            autoDismiss: true
          })
        }
      })
      .catch(e => {
        addToast("Delete class failed", {
          appearance: "error",
          autoDismiss: true
        })
      })
  }
}

export const updateClass = (token: string, class_id: number, input: UpdateClassInput, addToast: any) => {
  return async (dispatch: any) => {
    Axios.put(`${classService.UPDATE_CLASS_API.url}/${class_id}`, input, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch({
          type: UPDATE_CLASS,
          payload: res.data
        })
        if (addToast) {
          addToast("Updated class success", {
            appearance: "success",
            autoDismiss: true
          })
        }
      })
      .catch(e => {
        console.log(e)
        if (addToast) {
          addToast("Update class failed", {
            appearance: "error",
            autoDismiss: true
          })
        }
      })
  }
}


export const assignModuleToClass = (token: string, module_id: number, class_id: number, addToast: any) => {
  return async (dispatch: any) => {
    Axios.post(`${classService.ASSIGN_MODULE_TO_ClASS.url}/${module_id}/${class_id}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data !== null) {
          dispatch({
            type: UPDATE_MODULE_IN_CLASS,
            payload: res.data
          })
          if (addToast) {
            addToast("Add module into class success", {
              appearance: "success",
              autoDismiss: true
            })
          }
        }
      })
      .catch(e => {
        console.log(e)
        if (addToast) {
          addToast("This module already exists in class", {
            appearance: "error",
            autoDismiss: true
          })
        }
      })
  }
}

export const createModuleInClass = (
  token: string, class_id: number, code: string,
  input: ModuleCreate, addToast: any
) => {
  return async (dispatch: any) => {
    Axios.post(`${classService.CREATE_MODULE_IN_CLASS.url}/${class_id}/${code}`, input, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data !== null) {
          dispatch({
            type: UPDATE_MODULE_IN_CLASS,
            payload: res.data
          })
          const l = res.data.length;
          if (l > 0) {
            const newModule = res.data[l - 1];
            dispatch({
              type: CREATE_MODULE,
              payload: newModule
            })
          }
          if (addToast) {
            addToast("Add Module To Class Success", {
              appearance: "success",
              autoDismiss: true
            })
          }
        }
      })
      .catch(e => {
        addToast("Add Module To Folder Failed" || e, {
          appearance: "error",
          autoDismiss: true
        })
      })
  }
}

export const getModulesInClass = (token: string, class_id: number, addToast: any, setLoading: any) => {
  return async (dispatch: any) => {
    Axios.get(`${classService.GET_MODULES_IN_CLASS.url}?class_id=${class_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data !== null) {
          dispatch({
            type: UPDATE_MODULE_IN_CLASS,
            payload: res.data
          })
          if (setLoading) {
            setLoading(false)
          }
        }
      })
      .catch(e => {
        addToast("Get set in this class failed", {
          appearance: "error",
          autoDismiss: true
        })
        console.log(e)
      })
  }
}


export const deleteModuleFromClass = (token: string, module_id: number, class_id: number, addToast: any) => {
  return async (dispatch: any) => {
    Axios.delete(`${classService.DELETE_MODULE_FROM_CLASS.url}`, {
      params: {
        module_id: module_id,
        class_id: class_id
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data !== null) {
          dispatch({
            type: UPDATE_MODULE_IN_CLASS,
            payload: res.data
          })
          if (addToast) {
            addToast("Deleted module from class", {
              appearance: "success",
              autoDismiss: true
            })
          }
        }
      })
      .catch(e => {
        console.log(e)
        if (addToast) {
          addToast("Delete module from class failed", {
            appearance: "error",
            autoDismiss: true
          })
        }
      })
  }
}

export const getFoldersInClass = (token: string, class_id: number, addToast: any, callback?: any) => {
  return (dispatch: any) => {
    Axios.get(`${classService.GET_FOLDERS_IN_CLASS.url}?class_id=${class_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data !== null) {
          dispatch({
            type: UPDATE_FOLDER_IN_CLASS,
            payload: res.data
          })
          if (callback) {
            callback()
          }
        }
      })
      .catch(e => {
        console.log(e)
        if (addToast) {
          addToast("Get folder in class failed" || e, {
            appearance: "error",
            autoDismiss: true
          })
        }
      })
  }
}

export const assignFolderToClass = (
  token: string, folder_id: number,
  class_id: number, addToast: any
) => {
  return (dispatch: any) => {
    Axios.post(`${classService.ASSIGN_FOLDER_TO_CLASS.url}/${folder_id}/${class_id}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data !== null) {
        dispatch({
          type: UPDATE_FOLDER_IN_CLASS,
          payload: res.data
        })
      }
      if (addToast) {
        addToast("Add folder to class success", {
          appearance: "success",
          autoDismiss: true
        })
      }
    })
    .catch(e => {
      console.log(e)
      addToast("This folder already exists in class" || e, {
        appearance: "error",
        autoDismiss: true
      })
    })
  }
}

export const createFolderInClass = (
  token: string, class_id: number,
  code: string, input: CreateFolderInput, addToast: any
) => {
  return (dispatch: any) => {
    Axios.post(`${classService.CREATE_FOLDER_IN_CLASS.url}/${class_id}/${code}`, input, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data !== null) {
        dispatch({
          type: UPDATE_FOLDER_IN_CLASS,
          payload: res.data
        })
        const l = res.data.length;
        if (l > 0) {
          const newFolder = res.data[l-1];
          dispatch({
            type: ADD_FOLDER,
            payload: newFolder
          })
        }
      }
      if (addToast) {
        addToast("Add folder to class success", {
          appearance: "success",
          autoDismiss: true
        })
      }
    })
    .catch(e => {
      console.log(e)
      if (addToast) {
        addToast("Add folder to class failed" || e, {
          appearance: "error",
          autoDismiss: true
        })
      }
    })
  }
}

export const deleteFolderFromClass = (
  token: string, folder_id: number,
  class_id: number, addToast: any
) => {
  return async (dispatch: any) => {
    Axios.delete(`${classService.DELETE_FOLDER_FROM_CLASS.url}?folder_id=${folder_id}&class_id=${class_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data != null) {
        dispatch({
          type: UPDATE_FOLDER_IN_CLASS,
          payload: res.data
        })
      }
      if (addToast) {
        addToast("Deleted folder from class", {
          appearance: "success",
          autoDismiss: true
        })
      }
    })
    .catch(e => {
      console.log(e)
      if (addToast) {
        addToast("Delete folder from class failed" || e, {
          appearance: "error",
          autoDismiss: true
        })
      }
    })
  }
}
