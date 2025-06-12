import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { assests } from '../assets/assests';
import AddTodo from '../components/AddTodo';


function Home() {
  const navigate = useNavigate();

  const addTodos = () => {
    navigate("/AddTodos")
  }

  return (
    <>
      <div className="container-fluid bg-light vh-100 d-flex align-items-center">
        <div className="row w-100">
          <div className="col-md-6 offset-md-1">
            <div className="p-5 bg-white rounded shadow">
              <h1 className="mb-4">Welcome to the To-Do App</h1>
              <p className="lead">
                Stay organized and productive with our easy-to-use task manager. Add tasks, track progress, and manage your day efficiently — all in one place.
              </p>
              <p className="text-muted">
                Whether you're planning your day, organizing a project, or managing your goals — this app helps you get things done!
              </p>
              <button onClick={addTodos} className='btn btn-outline-info'>Get Started</button>
            </div>
          </div>
        </div>
        <div className="col-md-5 d-none d-md-block">
          <img
            src={assests.todo_img}
            alt="To-Do List"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </>
  )
}

export default Home


