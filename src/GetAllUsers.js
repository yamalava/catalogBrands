import { gql } from '@apollo/client';

const GET_ALL_USERS = gql`
    {
        allUsers {
            login
        }
    }
`;

export default GET_ALL_USERS