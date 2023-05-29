import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  // state to store tasks
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let inLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));
    // if thers is no tasks in local storage
    if (inLocalStorageTasks != null) {
      setTasks(inLocalStorageTasks);
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-12 gap-16">
        {/* creating tasks */}
        <CreateTask tasks={tasks} setTasks={setTasks} />
 
        {/* listTasks */}
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
