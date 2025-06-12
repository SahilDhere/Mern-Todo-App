import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditTodo = () => {
    
    const [editTodo, setEditTodo] = useState({name:' ', date:' '})
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/items/${id}`,{
          headers:{
            Authorization:'Bearer '+localStorage.getItem("token")
          }
        }).then((res)=>{
            setEditTodo(res.data)
        })
        .catch((err)=>{
            console.log("ErrorFetching Data", err);
        })
    },[id])

    const handleChange = (e)=>{
        setEditTodo({ ...editTodo, [e.target.name]: e.target.value }); 
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        await axios.put(`http://localhost:5000/items/${id}`,editTodo,{
          headers:{
            Authorization:'Bearer ' + localStorage.getItem("token")
          }
        });
        navigate("/TodoList")

    }

  return (
    <>
      <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
        <div className="p-5 bg-white shadow rounded" style={{ minWidth: '700px' }}>
          <h3 className="mb-4 text-center">Enter Your Todos</h3>
          <form className="d-flex gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              id="input"
              name="name"
              className="form-control"
              placeholder="Enter todo..."
              value={editTodo.name}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              className='form-control'
              placeholder='Enter Date'
              value={editTodo.date}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary" style={{ minWidth: '100px' }}>
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditTodo