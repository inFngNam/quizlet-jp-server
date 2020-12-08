import { BASE_URL } from '../../constants';
import { Api, HTTP_METHOD } from '../../types';

export const USER_REGISTER: Api = {
    url: `${BASE_URL}/auth/signup`,
    method: HTTP_METHOD.POST
}
export const USER_LOGIN: Api = {
    url: `${BASE_URL}/auth/login`,
    method: HTTP_METHOD.POST
}
export const QUERY_ME: Api = {
    url: `${BASE_URL}/auth/user`,
    method: HTTP_METHOD.GET
}
export const USER_LOGOUT: Api = {
    url: `${BASE_URL}/auth/logout`,
    method: HTTP_METHOD.GET
}