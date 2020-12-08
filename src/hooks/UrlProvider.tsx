import React, {createContext} from 'react';

type URL = {
    url: string;
}
const initial: URL = {
    url: 'url example'
}
export const UrlContext = createContext<URL>(initial);

function UrlProvider(props: any) {
    const {folder} = props;
    return (
        <UrlContext.Provider value={{url: folder.code}}>
            {props.children}
        </UrlContext.Provider>
    )
}
export default UrlProvider;