import React from "react";
import { useDrop } from "react-dnd";
import { Header } from "./Header";
import { Task } from "./Task";

export const Section = ({
  status,
  tasks,
  setTasks,
  todos,
  inProgress,
  closed,
  blocked
}) => {
  // drop functionality using useDrop hook from react-dnd
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // function for addItemToSection
  const addItemToSection = (id) => {
    // update or modify the status of the task
    setTasks((prevTasks) => {
      const modifiedTask = prevTasks.map((task) => {
        // modify the status
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });
      // update the tasks in localstorage
      localStorage.setItem("tasks", JSON.stringify(modifiedTask));
      // toast.success("Task status changed");
      return modifiedTask;
    });
  };

  // dynamically change the component based on the text bg(background color) and taskToMap based on props
  // tasksToMap is a placeholder that contains todos tasks or inProgress tasks or closed tasks Dynamically
  // initial state is todo
  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }

  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    tasksToMap = closed;
  }
  
  if(status === "blocked"){
    text="Blocked"
    bg = "bg-slate-600"
    tasksToMap = blocked
  }

  return (
    // drop reference
    <div className={`w-64`} ref={drop}>
      {/* header  */}
      <Header text={text} bg={bg} count={tasksToMap?.length} />

      {/*rendering tasks */}
      {tasksToMap?.length > 0 &&
        tasksToMap?.map((task, index) => (
          // returning individual task component
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};
