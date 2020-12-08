import { BASE_URL } from '../../constants';
import { Api, HTTP_METHOD } from '../../types';

export const JOIN_CLASS: Api = {
    url: `${BASE_URL}/class/join/join-request`,
    method: HTTP_METHOD.POST
}

export const CONFIRM_REQUEST: Api = {
    url: `${BASE_URL}/class/join/confirm`,
    method: HTTP_METHOD.GET
}

export const MANAGEMENT_MEMBER: Api = {
    url: `${BASE_URL}/class/join/management/member`,
    method: HTTP_METHOD.GET
}

export const LIST_JOINED_CLASS: Api = {
    url: `${BASE_URL}/class/join/joinedClass`,
    method: HTTP_METHOD.GET
}

export const REMOVE_MEMBER: Api = {
    url: `${BASE_URL}/remove/member`,
    method: HTTP_METHOD.DELETE
}