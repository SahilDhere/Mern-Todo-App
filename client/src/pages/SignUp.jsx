import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const [signUp, setSignUp] = useState(false)

  useEffect(()=>{
    setSignUp(true)
  },[])

  const handleSubmit = async (e) => {

    try {

      e.preventDefault();

      const endpoint = signUp ? "login" : "signup"

      const res = await axios.post(`http://localhost:5000/auth/${endpoint}`, { name, password })
      setError("");
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user))
      console.log(res.data)
      

      setName("")
      setPassword("")
      navigate("/")
    } catch (error) {
      console.log(error.response?.data)
      setError(error.response?.data?.message)
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div style={{ minWidth: '300px', maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">{(signUp) ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">{(signUp ? "Login" : "Sign Up")}</button> <br />
          {error && <p className='text-danger text-center'>{error}</p>}<br />
          <p style={{ cursor: "pointer" }} onClick={() => setSignUp(prev => !prev)} className='text-primary text-center'>{(signUp ? "Already have an Account " : "Create a new Account")}</p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
