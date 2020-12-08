import { BASE_URL } from '../../constants';
import { Api, HTTP_METHOD } from '../../types';

export const LIST_FOLDERS: Api = {
    url: `${BASE_URL}/folder/listFolder`,
    method: HTTP_METHOD.GET
}

export const FOLDER_DETAIL: Api = {
    url: `${BASE_URL}/folder/detail`,
    method: HTTP_METHOD.GET
}

export const CREATE_FOLDER: Api = {
    url: `${BASE_URL}/folder/create`,
    method: HTTP_METHOD.POST
}

export const UPDATE_FOLDER_API: Api = {
    url: `${BASE_URL}/folder/update`,
    method: HTTP_METHOD.PUT
}

export const DELETE_FOLDER_API: Api = {
    url: `${BASE_URL}/folder/delete`,
    method: HTTP_METHOD.DELETE
}

export const CREATE_MODULE_IN_FOLDER: Api = {
    url: `${BASE_URL}/folder/module/add-module-in-folder`,
    method: HTTP_METHOD.POST
}

export const GET_MODULES_IN_FOLDER: Api = {
    url: `${BASE_URL}/folder/module/list`,
    method: HTTP_METHOD.GET
}

export const ASSIGN_MODULE_IN_FOLDER: Api = {
    url: `${BASE_URL}/folder/module/assign-to-folder`,
    method: HTTP_METHOD.POST
}

export const DELETE_MODULE_FROM_FOLDER: Api ={
    url: `${BASE_URL}/folder/module/delete-from-folder`,
    method: HTTP_METHOD.DELETE
}

export const GENERATE_SHARED_LINK: Api = {
    url: `${BASE_URL}/folder/generate-shared-link`,
    method: HTTP_METHOD.GET
}

export const SHARE_LINK_ACTION: Api = {
    url: `${BASE_URL}/folder/send-shared-link`,
    method: HTTP_METHOD.POST
}