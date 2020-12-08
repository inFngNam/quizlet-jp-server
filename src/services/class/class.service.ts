import { BASE_URL } from '../../constants';
import { Api, HTTP_METHOD } from '../../types';

export const LIST_CLASS: Api = {
  url: `${BASE_URL}/class/all`,
  method: HTTP_METHOD.GET
}

export const CREATE_CLASS: Api = {
  url: `${BASE_URL}/class/create`,
  method: HTTP_METHOD.POST
}

export const UPDATE_CLASS_API: Api = {
  url: `${BASE_URL}/class/update`,
  method: HTTP_METHOD.PUT
}

export const DELETE_CLASS_API: Api = {
  url: `${BASE_URL}/class/delete`,
  method: HTTP_METHOD.DELETE
}

export const CREATE_MODULE_IN_CLASS: Api = {
  url: `${BASE_URL}/class/module/add-module-in-class`,
  method: HTTP_METHOD.POST
}

export const GET_MODULES_IN_CLASS: Api = {
  url: `${BASE_URL}/class/module/all`,
  method: HTTP_METHOD.GET
}

export const ASSIGN_MODULE_TO_ClASS: Api = {
  url: `${BASE_URL}/class/module/assign-module-to-class`,
  method: HTTP_METHOD.POST
}
//
export const DELETE_MODULE_FROM_CLASS: Api = {
  url: `${BASE_URL}/class/module/delete-from-class`,
  method: HTTP_METHOD.DELETE
}

export const CLASS_DETAIL: Api = {
  url: `${BASE_URL}/class/detail`,
  method: HTTP_METHOD.GET
}
export const GENERATE_SHARED_LINK_CLASS: Api = {
  url: `${BASE_URL}/class/generate-shared-link`,
  method: HTTP_METHOD.GET
}

export const SHARE_CLASS_LINK: Api = {
  url: `${BASE_URL}/class/send-shared-link`,
  method: HTTP_METHOD.POST
}

export const GET_FOLDERS_IN_CLASS: Api = {
  url: `${BASE_URL}/class/folder/all`,
  method: HTTP_METHOD.GET
}

export const ASSIGN_FOLDER_TO_CLASS: Api = {
  url: `${BASE_URL}/class/folder/assign-folder-to-class`,
  method: HTTP_METHOD.POST
}

export const CREATE_FOLDER_IN_CLASS: Api = {
  url: `${BASE_URL}/class/folder/add-folder-in-class`,
  method: HTTP_METHOD.POST
}

export const DELETE_FOLDER_FROM_CLASS: Api = {
  url: `${BASE_URL}/class/folder/delete-from-class`,
  method: HTTP_METHOD.DELETE
}

// export const JOIN_CLASS: Api = {
//   url: `${BASE_URL}/class/join/join-request`,
//   method: HTTP_METHOD.POST
// }

// export const CONFIRM_REQUEST: Api = {
//   url: `${BASE_URL}/confirm`,
//   method: HTTP_METHOD.GET
// }

// export const MANAGEMENT_MEMBER: Api = {
//   url: `${BASE_URL}/management/member`,
//   method: HTTP_METHOD.GET
// }

// export const LIST_JOINED_CLASS: Api = {
//   url: `${BASE_URL}/joinedClass`,
//   method: HTTP_METHOD.GET
// }