import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

function CreateTask({ tasks, setTasks }) {

  // state for creating a single indivdual task
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  // if the create button is pressed
  const handleSubmit = (e) => {
    // to prevent refresh
    e.preventDefault();

    // to check if the input field is empty
    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters");

    // setTasks
    setTasks((tasks) => {
      const list = [...tasks, task];
      // set the task to localstorage
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    // successtoast
    toast.success("Task added");

    // set back to initial state to clear the input field
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <div>
      {/* form */}
      <form onSubmit={handleSubmit}>
        {/* input field */}
        <input
          type="text"
          placeholder="Enter Todo"
          value={task.name}
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), name: e.target.value })
          }
          className="border-2 border-slate-400 bg-slate-100 rounded-md h-12 w-64 mr-4 ps-3"
        />

        {/* button */}
        <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
