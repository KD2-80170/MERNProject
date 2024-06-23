import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import Create from './Create';
import './App.css';

function Home() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get("http://localhost:9999/get")
            .then(result => setTodos(result.data))
            .catch(err => setError(err));
    };

    const handleEdit = (id) => {
        axios.put(`http://localhost:9999/update/` + id)
            .then(result => {
                location.reload();
                fetchTodos();
            })
            .catch(err => setError(err));
    };
    const Ldelete=(id)=>{axios.delete(`http://localhost:9999/delete/`+ id)
        .then(result => {
            location.reload();
            fetchTodos();
        })
        .catch(err => setError(err))};

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="home">
            <h1>TO DO LIST</h1>
            <Create />
            {todos.length === 0 ? (
                <div><h2>No Records Found</h2></div>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <div key={todo._id} className="task">
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                {todo.done ? 
                                    <BsFillCheckCircleFill className="icon" /> : 
                                    <BsCircleFill className="icon" />
                                }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <BsFillTrashFill className="icon" onClick={()=>{Ldelete(todo._id)}}/>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Home;
