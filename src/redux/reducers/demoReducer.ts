import {GET_BY_CURRENCY} from '../actions/demoAction'
const initialState = {data: []} // You can get data from cache or local storage and assign initialState instead of empty array
const demoReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case GET_BY_CURRENCY:
            return {...state, ...{data: action.payload}}
        default:
            return state;
    }
}
export default demoReducer;