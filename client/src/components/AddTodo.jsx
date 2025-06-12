import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddTodo = () => {

  const [todoItem, setTodoItem] = useState("")
  const [todoDate, setTodoDate] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!todoItem || !todoDate) {
      alert("please fill the both data")
      return
    }

    try {
      const res = await axios.post("http://localhost:5000/items", {
        name: todoItem,
        date: todoDate,
      },
      {
        headers:{
          Authorization:'Bearer ' + localStorage.getItem("token")
        }
      }
      )
      console.log(res.data)
      setTodoItem("");
      setTodoDate("");
      navigate("/TodoList")

    } catch (error) {
      console.log("error occured ", error.response?.data || error.message)
    }

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
              className="form-control"
              placeholder="Enter todo..."
              value={todoItem}
              onChange={(e) => setTodoItem(e.target.value)}
            />
            <input
              type="date"
              className='form-control'
              placeholder='Enter Date'
              value={todoDate}
              onChange={(e) => setTodoDate(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ minWidth: '100px' }}>
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTodo