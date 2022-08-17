import React from 'react';
import { useQuery} from '@apollo/client';
import ClientRow from './ClientRow';
import { GET_CLIENT } from '../queries/clientQueries';
import Spinner from './Spinner';


export default function Clients() {

  const {loading, error, data} = useQuery(GET_CLIENT);
  
  if(loading) return <Spinner />;
  if(error) return <p>Something went wrong</p>;
  return (
    <>
      {
        !loading && !error && (
          <table className='table table-hover mt-3'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.client.clients.map(client => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        )
      }
    </>
  )
}
