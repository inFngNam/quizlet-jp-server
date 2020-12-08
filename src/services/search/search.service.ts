import { BASE_URL } from "../../constants";
import { Api, HTTP_METHOD } from "../../types";

export const SEARCH_MODULE: Api = {
    url: `${BASE_URL}/search/module`,
    method: HTTP_METHOD.GET
}
export const SEARCH_FOLDER: Api = {
    url: `${BASE_URL}/search/folder`,
    method: HTTP_METHOD.GET
}
export const SEARCH_CLASS: Api = {
    url: `${BASE_URL}/search/class`,
    method: HTTP_METHOD.GET
}
export const SEARCH_USER: Api = {
    url: `${BASE_URL}/search/user`,
    method: HTTP_METHOD.GET
}