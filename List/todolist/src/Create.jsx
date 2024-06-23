import React, { useState } from "react";
import axios from "axios";

function Create() {
    const [task, setTask] = useState(""); // Initialize task state

    const handleAdd = () => {
        axios.post("http://localhost:9999/add", { task })
            .then(result => {
                location.reload();
                setTask(""); // Reset task input field
                alert("Task added successfully!"); // Provide user feedback
            })
            .catch(err => {
                console.log(err);
                alert("Error adding task"); // Provide user feedback
            });
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter Task"
                value={task} // Bind the input value to state
                onChange={(e) => setTask(e.target.value)} // Update task state on input change
            />
            <button type="button" onClick={handleAdd}>ADD</button>
        </div>
    );
}

export default Create;
