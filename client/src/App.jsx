import React from 'react'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Contact from './pages/Contact'
import About from './pages/About'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Footer from './pages/Footer'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
// import TodoItems from './components/TodoItems'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import EditTodo from './components/EditTodo'

const App = () => {

  const getTodoList = async()=>{
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found! User might not be logged in.");
      return;
    }

    const res = await axios.get("http://localhost:5000/items", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    console.log(res.data); 
  } catch (error) {
      console.log(error)
    }
  }


  const router = createBrowserRouter([

    {
      path: "/",
      element: <><MainNavigation /></>, children: [
        {
          path: "/",
          element: <><Navbar /> <Home /></>
        },
        {
          path: "/About",
          element: <> <Navbar /> <About /></>
        },
        {
          path: "/contact",
          element: <><Navbar /> <Contact /></>
        },
        {
          path: "/signup",
          element: <><Navbar /> <SignUp /></>
        },
        {
          path: "/AddTodos",
          element: <><Navbar /> <AddTodo /></>
        },
         {
          path: "/TodoList",
          element: <><Navbar /> <TodoList /></>,loader:getTodoList
        },
       {
          path: "/editTodo/:id",
          element: <><Navbar /> <EditTodo/></>
        },
      ]
    }

  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App