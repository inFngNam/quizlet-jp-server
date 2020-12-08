import { Api, HTTP_METHOD } from '../../types';
import { BASE_URL } from '../../constants';
export const TERM_GET: Api = {
    url: `${BASE_URL}/module/term/get-list-terms`,
    method: HTTP_METHOD.GET
}

export const TERM_CREATE: Api = {
    url: `${BASE_URL}/module/term/create`,
    method: HTTP_METHOD.POST
}

export const TERM_DELETE: Api = {
    url: `${BASE_URL}/module/term/delete`,
    method: HTTP_METHOD.DELETE
}

export const TERM_UPDATE: Api = {
    url: `${BASE_URL}/module/term/update-term-by-module`,
    method: HTTP_METHOD.PUT
}