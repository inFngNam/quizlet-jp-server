import {Api, HTTP_METHOD} from '../../types';
import {BASE_URL} from '../../constants';

export const TEST_GET: Api = {
    url: `${BASE_URL}/module/test`,
    method: HTTP_METHOD.GET
}
export const TEST_CHECK: Api = {
    url: `${BASE_URL}/module/test/finish`,
    method: HTTP_METHOD.GET
}
