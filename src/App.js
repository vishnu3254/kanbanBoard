import React, { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
const schedule = require("node-schedule");

function App() {
  // state to store all tasks
  const [tasks, setTasks] = useState([]);

  //state to know if the task is added   
  const [taskAdded, setTaskAdded] = useState(false);


  // getting the props from child for whenever task is added getting the data from localstorage
  const handleDataFromChild = (data) => {
    // console.log("Data received from child:", data);
    setTaskAdded(true);
  };

  // function for scheduling the tasks
  const scheduleTasks = (allTasks) => {
    allTasks?.map((task) => {
      if (!task.schedule) {
        // console.log(task.schedule);
        let date = task.date;
        let time = task.time;

        // console.log("date :", date, "time:", time);
        const targetDate = new Date(`${date} ${time}`); // Specify the target date and time here

        console.log(`task scheduled for ${task.name}`);

        const job = schedule.scheduleJob(targetDate, async () => {
          // console.log("Hey hi this is reminding you...", task.name);
          const taskDescription = task.name;
          let res = await axios.post("http://localhost:4000/send-mail", {
            name: taskDescription,
          });
          console.log("response", res);
        });
       
      }
      task.schedule = true;
      //update locallstorage
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      // setTasks([...allTasks,task])
    });
  };

  useEffect(() => {
    console.log("use Effect called ");
    // get the tasks that are stored in localstorage and set it to tasks
    let inLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));

    // if thers are tasks in local storage then set it to tasks otherwise dont set it will give null
    if (inLocalStorageTasks != null) {
      setTasks(inLocalStorageTasks);
    }
    setTaskAdded(false);
    scheduleTasks(inLocalStorageTasks);
  }, [taskAdded]);

  return (
    // DndProvider acts as a context provider and wraps  entire application or a specific part of it to enable drag and drop operations.
    <DndProvider backend={HTML5Backend}>
      {/* toasting functionality */}
      <Toaster />

      <div className="bg-slate-100 flex flex-col items-center pt-12 gap-16">
        {/* creating tasks */}
        <CreateTask
          tasks={tasks}
          setTasks={setTasks}
          onData={handleDataFromChild}
        />

        {/* Displaying tasks according to the status */}
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
