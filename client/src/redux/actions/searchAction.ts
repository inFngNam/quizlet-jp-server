import {
    SEARCH_FOLDER,
    SEARCH_MODULE,
    SEARCH_CLASS
} from '../../services/search/search.service';
import { QuerySearchInput } from '../../types';
import Axios from 'axios';

export const searchModule = async (token: string, query: QuerySearchInput, callback?: any) => {
    const response = await Axios.get(
        `${SEARCH_MODULE.url}?name=${query.name}&sortBy=${query.sortBy}&sortType=${query.sortType}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        )
        .then(res => {
            if (res.data !== null) {
                return res.data
            }
        })
        .catch(e => {
            console.log(e)
        })
        console.log(response)
        return response;
}

export const searchFolder = async (token: string, query: QuerySearchInput, addToast? : any) => {
    const response = await Axios.get(
        `${SEARCH_FOLDER.url}?name=${query.name}&sortBy=${query.sortBy}&sortType=${query.sortType}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
    .then(res => {
        if (res.data !== null) {
            return res.data;
        }
    })
    .catch(e => {
        console.log(e)
    })
    console.log(response);
    return response;
}

export const searchClass = async (token: string, query: QuerySearchInput, addToast?: any) => {
    const response = await Axios.get(
        `${SEARCH_CLASS.url}?name=${query.name}&sortBy=${query.sortBy}&sortType=${query.sortType}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
    .then(res => {
        if (res.data !== null) {
            return res.data
        }
    })
    .catch(e => {
        console.log(e)
    })
    console.log(response)
    return response;
}