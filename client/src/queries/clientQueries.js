import {gql} from '@apollo/client';

const GET_CLIENT = gql`
  query getClients{
    client{
      clients{
        id
        name
        email
        phone
      }
    }
  }
`;

export {GET_CLIENT};