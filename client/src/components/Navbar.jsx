import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {

    let token = localStorage.getItem("token")

    const [isLogin, setIsLogin] = useState(token ? false : true)
    let user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        setIsLogin(token ? false : true)
    }, [token])


    const checkLogin = () => {
        if (token) {
            // for the logout
            localStorage.removeItem("token");
            localStorage.removeItem("user")
            setIsLogin(true)
        }
    }

    return (
        <div>
            <ul className='navbar p-2 mb-2 bg-dark text-primary-emphasis'>
                <li><NavLink className='btn btn-outline-info' to="/">Home</NavLink></li>

                <li><NavLink className='btn btn-outline-success' to={isLogin ? '/signup' : '/TodoList'}>Todo List</NavLink></li>

                <li><NavLink className='btn btn-outline-secondary text-light' to={isLogin ? '/signup' : '/about'}>About</NavLink></li>

                <li><NavLink className='btn btn-outline-light' to={isLogin ? '/signup' : '/contact'}>Contact</NavLink></li>

                <li onClick={checkLogin}><NavLink className='btn btn-outline-danger' to="/signup"> 
                {isLogin ? "SignUp" : "Logout "} {user?.name ? `${user?.name}` : " "}
                </NavLink></li>

            </ul>
        </div>
    )
}

export default Navbar

