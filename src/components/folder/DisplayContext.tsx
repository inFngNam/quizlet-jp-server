import React, { useContext } from 'react';
import { UrlContext } from '../../hooks/UrlProvider';

const DisplayContext = () => {
    const url = useContext(UrlContext);
    return (
        <h1>{url.url}</h1>
    )
}
export default DisplayContext;