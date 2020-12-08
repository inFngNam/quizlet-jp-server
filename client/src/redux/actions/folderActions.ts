import Axios from 'axios';
import { CreateFolderInput, UpdateFolderInput, ModuleCreate } from '../../types';
import { LIST_FOLDERS, CREATE_FOLDER,
    DELETE_FOLDER_API, UPDATE_FOLDER_API,
    CREATE_MODULE_IN_FOLDER, GET_MODULES_IN_FOLDER,
    DELETE_MODULE_FROM_FOLDER, ASSIGN_MODULE_IN_FOLDER
} from '../../services/folder/folder.service';
import { CREATE_MODULE, CREATE_MODULE_BY_OTHER_WAY } from './moduleAction';

export const ADD_FOLDER = "ADD_FOLDER";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const DELETE_FOLDER = "DELETE FOLDER";
export const UPDATE_BY_API = "UPDATE_BY_API";
export const UPDATE_MODULE_IN_FOLDER = "UPDATE_MODULE_IN_FOLDER";

export const getListFolders = (token: string) => {
    return async (dispatch: any) => {
        Axios.get(LIST_FOLDERS.url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            dispatch({
                type: UPDATE_BY_API,
                payload: res.data
            })
        })
        .catch(e => {
            console.log(e)
        })
    }
}
export const createFolder = (token: string, input: CreateFolderInput, addToast: any) => {
    return async (dispatch: any) => {
        Axios.post(CREATE_FOLDER.url, input, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.data) {
                dispatch({
                    type: ADD_FOLDER,
                    payload: res.data
                })
            }
            if (addToast) {
                addToast("Create folder success", {
                    appearance: "success",
                    autoDismiss: true
                })
            }
        })
        .catch(e => {
            console.log(e)
            if (addToast) {
                addToast("Create folder failed", {
                    appearance: "error",
                    autoDismiss: true
                })
            }
        })
    }
}

export const deleteFolder = (token: string, folder_id: number, addToast: any) => {
    return async(dispatch: any) => {
        Axios.delete(DELETE_FOLDER_API.url + `/${folder_id}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch({
                type: DELETE_FOLDER,
                payload: res.data
            })
            if (addToast) {
                addToast("Deleted folder success", {
                    appearance: "success",
                    autoDismiss: true
                })
            }
        })
        .catch(e => {
            addToast("Delete folder failed", {
                appearance: "error",
                autoDismiss: true
            })
        })
    }
}

export const updateFolder = (token: string, folder_id: number, input: UpdateFolderInput, addToast: any) => {
    return async (dispatch: any) => {
        Axios.put(`${UPDATE_FOLDER_API.url}/${folder_id}`, input, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch({
                type: UPDATE_FOLDER,
                payload: res.data
            })
            if (addToast) {
                addToast("Updated folder success", {
                    appearance: "success",
                    autoDismiss: true
                })
            }
        })
        .catch(e => {
            console.log(e)
            if (addToast) {
                addToast("Update folder failed", {
                    appearance: "error",
                    autoDismiss: true
                })
            }
        })
        // .finally(() => {
        //     window.location.reload()
        // })
    }
}
export const createModuleInFolder = (token: string, folder_id: number, code: string, input: ModuleCreate, addToast: any) => {
    return async (dispatch: any) => {
        Axios.post(`${CREATE_MODULE_IN_FOLDER.url}/${folder_id}/${code}`, input, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.data !== null) {
                dispatch({
                    type: UPDATE_MODULE_IN_FOLDER,
                    payload: res.data
                })
                const l =  res.data.length;
                if (l > 0) {
                    const newModule = res.data[l-1]
                    dispatch({
                        type: CREATE_MODULE,
                        payload: newModule
                    })
                }
                if (addToast) {
                    addToast("Add Module To Folder Success", {
                        appearance: "success",
                        autoDismiss: true
                    })
                }
            }
        })
        .catch(e => {
            if (addToast) {
                addToast("Add Module To Folder Failed", {
                    appearance: "error",
                    autoDismiss: true
                })
            }
            console.log(e)
        })
    }
}

export const assignModuleToFolder = (token: string, module_id: number, folder_id: number, addToast: any) => {
    return async (dispatch: any) => {
        Axios.post(`${ASSIGN_MODULE_IN_FOLDER.url}/${module_id}/${folder_id}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.data !== null) {
                dispatch({
                    type: UPDATE_MODULE_IN_FOLDER,
                    payload: res.data
                })
                if (addToast) {
                    addToast("Add module into folder success", {
                        appearance: "success",
                        autoDismiss: true
                    })
                }
            }
        })
        .catch(e => {
            console.log(e)
            if (addToast) {
                addToast("This module already exists in folder", {
                    appearance: "error",
                    autoDismiss: true
                })
            }
        })
    }
}

export const getModulesInFolder = (token: string, folder_id: number, addToast: any, setLoading?: any) => {
    return async (dispatch: any) => {
        Axios.get(`${GET_MODULES_IN_FOLDER.url}?folder_id=${folder_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.data !== null) {
                dispatch({
                    type: UPDATE_MODULE_IN_FOLDER,
                    payload: res.data
                })
                if (setLoading) {
                    setLoading(false);
                }
                console.log("Fetching...")
                return res.data
            }
        })
        .catch(e => {
            addToast("Get set in this folder failed", {
                appearance: "error",
                autoDismiss: true
            })
            console.log(e)
        })
    }
}
export const deleteModuleFromFolder = (token: string, module_id: number, folder_id: number, addToast: any) => {
    return async (dispatch: any) => {
        Axios.delete(`${DELETE_MODULE_FROM_FOLDER.url}`, {
            params: {
                module_id: module_id,
                folder_id: folder_id
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.data !== null) {
                dispatch({
                    type: UPDATE_MODULE_IN_FOLDER,
                    payload: res.data
                })
                if (addToast) {
                    addToast("Deleted module from folder", {
                        appearance: "success",
                        autoDismiss: true
                    })
                }
            }
        })
        .catch(e => {
            console.log(e)
            if (addToast) {
                addToast("Delete module from folder failed", {
                    appearance: "error",
                    autoDismiss: true
                })
            }
        })
    }
}
