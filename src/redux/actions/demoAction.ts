import { GET_RATES, GET_ONE_ITEM } from './../../graphql/demo-graphql';
import { client } from './../../apollo-graphql';

export const GET_BY_CURRENCY = "GET_BY_CURRENCY";
export const GET_ONE_ITEM_ACTION = "GET_ONE_ITEM";

export const getRatedByCurrency = (currency: string) => {
    return async (dispatch: any) => {
        try {
            const getRates = await client.query({
                query: GET_RATES,
                variables: {
                    currency: currency
                }
            });
            const rates = getRates?.data?.rates ? getRates.data.rates : null;
            if (rates != null) {
                dispatch({
                    type: GET_BY_CURRENCY,
                    payload: rates
                })
            }
            else {
                console.log("Check your networking...")
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const getOneItem = () => {
    return async(dispatch: any) => {
        try {
            const getOneItem = await client.query({
                query: GET_ONE_ITEM
            });
            const data = getOneItem.data.item;
            if (data != null) {
                dispatch({
                    type: GET_BY_CURRENCY,
                    payload: data
                })
            }
            else {
                console.log("Check your networking...")
            }
        }
        catch(error) {
            console.log(error)
        }
    }
}