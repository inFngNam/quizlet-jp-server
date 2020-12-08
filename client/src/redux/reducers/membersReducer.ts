import { ActionStore } from "../../types"

const initialMembers = {
    list: [] as any,
    total: 0
}

const membersReducer = (state = initialMembers, action: ActionStore) => {
    switch(action.type) {
        case 'GET_MEMBERS':
            return {...state, list: action.payload, total: action.payload.length}
        default:
            return state;
    }
}
export default membersReducer;