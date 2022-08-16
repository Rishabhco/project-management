import {gql} from '@apollo/client';

const ADD_PROJECT = gql`
    mutation AddProject($name: String!, $descroption: String!, $status: ProjectStatus!, $clientId: ID!){
        project{
            addProject(name: $name, description: $description, status: $status, clientId: $clientId){
                id
                name
                description
                status
                client{
                    id
                    name
                    email
                    phone
                }
            }
        }
        
    }
`;

const DELETE_PROJECT = gql`
    mutation DeleteProject($id:ID!){
        project{
            deleteProjectId(id:$id){
                id
            }
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation UpdateProject($name: String!, $descroption: String!, $status: ProjectStatusUpdate!, $clientId: ID!){
        project{
            updateProject(name: $name, description: $description, status: $status){
                id
                name
                description
                status
                client{
                    id
                    name
                    email
                    phone
                }
            }
        }
    }
`;

export {ADD_PROJECT,DELETE_PROJECT,UPDATE_PROJECT};