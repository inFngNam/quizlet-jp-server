import React from "react";
const initialURL: string = 'abc';
type test = {
    initialURL: any;
    setUrlCodeHandle?: any
}
const initial: test = {
    initialURL: 'abc'
}
export const FetchApiContext = React.createContext<test>(initial);