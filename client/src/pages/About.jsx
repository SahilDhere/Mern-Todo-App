import React from 'react'

function About() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center p-5 bg-white rounded shadow" style={{ maxWidth: "600px" }}>
          <h1 className="mb-4">About</h1>
          <p className="lead">
            This To-Do App is a simple and efficient task manager that helps you organize your daily activities.
            You can add, delete, and manage your tasks with ease. It's built using the MERN stack and styled with Bootstrap for a clean and responsive interface.
          </p>
          <p className="text-muted">
            Stay productive, stay focused — and never forget a task again!
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
