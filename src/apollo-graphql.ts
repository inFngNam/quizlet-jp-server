import { ApolloClient, InMemoryCache,NormalizedCacheObject, } from "@apollo/client";
// import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
const links = {
    client: new HttpLink({
        uri: 'http://localhost:3000/graphql',
        credentials: 'same-origin',
        fetchOptions: {
            mode: 'no-cors'
        }
    })
}
const link = new ApolloLink(operation => {
    const definition = getMainDefinition(operation.query);
    let endpoint = 'client';
    if ('operation' in definition) {
        const foundDirective = definition.directives?.find(item =>
            Object.keys(links).includes(item.name.value)
        );
        if (foundDirective) {
            endpoint = foundDirective.name.value;
            // remove the directive from the request
            // operation.query.definitions[0].directives = operation.query.definitions[0].directives.filter(
            //     dir => dir.name.value !== endpoint
            // );
            // operation.query.loc.source.body = operation.query.loc.source.body.replace(
            //     `@${endpoint} `,
            //     ''
            // );
        }
    }
    return links['client'].request(operation);
});

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    
});