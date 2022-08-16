import React,{useState} from 'react';
import {FaList} from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import Spinner from './Spinner';
import { GET_CLIENT } from '../queries/clientQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';

export default function AddClientModal() {

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [clietId,setClientId] = useState('');
    const [status,setStatus] = useState('new');

    const [addProject] = useMutation(ADD_PROJECT,{
        variables: {name,description,clietId,status},
        update(cache, {data: {addProject}}){
            const {projects} = cache.readQuery({
                query: GET_PROJECTS
            });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {projects: [...projects,addProject]},
            })
        }
    })

    const {loading, error, data} = useQuery(GET_CLIENT);
  

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(name==='' || description==='' || status===''){
            return alert('Please fill in all fields');
        }

        addProject(name,description,clietId,status);

        setName('');
        setDescription('');
        setStatus('new');
    }

    if(loading) return <Spinner />;
  if(error) return <p>Something went wrong</p>;

  return (
    <>
    {
        !loading && !error && (
            <>
                <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
  <div className="d-flex align-items-center">
    <FaList className='icon' />
    <div>Add Project</div>
  </div>
</button>

<div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className='form-label'>Name</label>
                <input type="text" className="form-control" id="name"  value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className='form-label'>Description</label>
                <textarea className="form-control" id="description"  value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className='form-label'>Status</label>
                <select id="status" className='form-select' value={status} onChange={(e) => setStatus(e.target.value) }>
                    <option value="new">New</option>
                    <option value="progress">Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="mb-3">
                <label className='form-label'>Client</label>
                <select id="status" className='form-select' value={clietId} onChange={(e) => setClientId(e.target.value) }>
                    <option value="">Select Client</option>
                    {data.client.clients.map((client) => {
                        return <option key={client.id} value={client.id}>{client.name}</option>
                    })}
                </select>
            </div>
        </form>
      </div>
      <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">
        Submit
      </button>
    </div>
  </div>
</div>
            </>
        )
    }

    </>
  )
}
