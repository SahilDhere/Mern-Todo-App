
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function TodoList() {
  const [todoItems, setTodoItems] = useState([]);
  const navigate = useNavigate();

  // Fetch all todos from the backend with authorization
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized access! Please login.");
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/items", {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      setTodoItems(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const OnDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/items/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      setTodoItems(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Delete failed:', error.response?.data || error.message);
      alert("Failed to delete");
    }
  };

  return (
    <div className="container mt-5 vh-100">
      <h2 className="text-center mb-4">📋 Todo Dashboard</h2>

      {todoItems.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Todo Name</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {todoItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>
                    <Link to={`/editTodo/${item._id}`} className="btn btn-outline-primary btn-sm">
                      <FaRegEdit />
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => OnDelete(item._id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">Todo List is Empty</div>
      )}
    </div>
  );
}

export default TodoList;
