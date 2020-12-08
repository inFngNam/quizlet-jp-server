import {  
    JOIN_CLASS, CONFIRM_REQUEST,
    MANAGEMENT_MEMBER, LIST_JOINED_CLASS,
    REMOVE_MEMBER
} from '../../services/joining/joining.service';
import Axios from 'axios';

export const GET_JOINED_CLASS = "GET_JOINED_CLASS";

export const joinClass = async (token: string, class_id: number, addToast?: any) => {
    Axios.post(`${JOIN_CLASS.url}/${class_id}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        addToast("Sent request to owner class", {
            appearance: "success",
            autoDismiss: true
        })
    })
    .catch(e => {
        console.log(e);
        addToast("You already joined class", {
            appearance: "error",
            autoDismiss: true
        })
    })
}

export const managementMember = async (token: string, class_id: number, code: string) => {
    const members = await Axios.get(`${MANAGEMENT_MEMBER.url}/${class_id}/${code}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.data !== null) {
            return res.data;
        }
    })
    .catch(e => {
        console.log(e)
    })
    console.log(members)
    return members;
}

export const joinedClass = (token: string) => {
    return async (dispatch: any) => {
        Axios.get(`${LIST_JOINED_CLASS.url}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.data !== null) {
                dispatch({
                    type: GET_JOINED_CLASS,
                    payload: res.data
                })
            }
        })
        .catch(e => {
            console.log(e)
        })
    }
}

export const removeMember = async (token: string, class_id: number, member_id: number, addToasy?: any) => {
    const members = Axios.delete(`${REMOVE_MEMBER.url}/${class_id}/${member_id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.data !== null) {
            return res.data
        }
    })
    .catch(e => {
        console.log(e)
    })
    console.log(members)
    return members;
}