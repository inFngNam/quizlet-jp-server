import { Api, HTTP_METHOD } from '../../types';
import { BASE_URL } from '../../constants';
export const MODULE_GET: Api = {
    url: `${BASE_URL}/module/selfModule`,
    method: HTTP_METHOD.GET
}

export const MODULE_CREATE: Api = {
    url: `${BASE_URL}/module/create`,
    method: HTTP_METHOD.POST
}

export const MODULE_DELETE: Api = {
    url: `${BASE_URL}/module/delete`,
    method: HTTP_METHOD.DELETE
}

export const MODULE_UPDATE: Api = {
    url: `${BASE_URL}/module/update`,
    method: HTTP_METHOD.PUT
}
