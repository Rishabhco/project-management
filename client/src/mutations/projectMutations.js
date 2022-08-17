import {gql} from '@apollo/client';

const ADD_PROJECT = gql`
    mutation AddProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!){
        project{
            addProjects(name: $name, description: $description, status: $status, clientId: $clientId){
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
            deleteProject(id:$id){
                id
            }
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation UpdateProject($id:ID!,$name: String!, $description: String!, $status: StatusUpdate!){
        project{
            updateProject(id:$id,name: $name, description: $description, status: $status){
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