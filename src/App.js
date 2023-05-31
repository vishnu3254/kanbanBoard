import React, { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  // state to store all tasks
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // get the tasks that are stored in localstorage and set it to tasks
    let inLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));

    // if thers are tasks in local storage then set it to tasks otherwise dont set it will give null
    if (inLocalStorageTasks != null) {
      setTasks(inLocalStorageTasks);
    }
  }, []);

  return (
    // DndProvider acts as a context provider and wraps  entire application or a specific part of it to enable drag and drop operations.
    <DndProvider backend={HTML5Backend}>
      {/* toasting functionality */}
      <Toaster />

      <div className="bg-slate-100 flex flex-col items-center pt-12 gap-16">
        {/* creating tasks */}
        <CreateTask tasks={tasks} setTasks={setTasks} />

        {/* Displaying tasks according to the status */}
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
