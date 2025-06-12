import React from 'react'

function Contact() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center p-5 bg-white rounded shadow" style={{ maxWidth: "600px" }}>
          <h1 className="mb-4">Contact Us</h1>
          <p className="lead">
            We'd love to hear from you! If you have any questions, feedback, or suggestions about the To-Do App, feel free to reach out.
          </p>
          <p className="text-muted mb-4">
            You can contact us at:
          </p>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> support@todoapp.com</li>
            <li><strong>Phone:</strong> +1 (123) 456-7890</li>
            <li><strong>Address:</strong> 123 Kolhapur Lane - 4 Nagala Park</li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Contact
