import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './fragment.graphql';

export const LOG_IN = gql`
    mutation login($input: LoginInput!) {
        login(input: $input) {
            token
            user {
                ...User
            }
        }
    }
    ${USER_FRAGMENT}
`;
export const REGISTER = gql`
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            token
            user {
                ...User
            }
        }
    }
    ${USER_FRAGMENT}
`;