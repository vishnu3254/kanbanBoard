import { useDrag } from "react-dnd";
import { toast } from "react-hot-toast";
import React from "react";

export const Task = ({ task, tasks, setTasks }) => {

  // drag functionality using useDrag hook from react-dnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id }, //refers to the item that we are dragging
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // console.log(isDragging);

  // function to delete tasks
  const handleRemove = (id) => {
    // filtering the tasks based on id 
    const fTasks = tasks?.filter((t) => t.id !== id);
    // after filtering update the tasks
    setTasks(fTasks);

    toast.success("Task removed Successfully");
  };

  return (
    // set drag reference
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab`}
    >
      {/* actual task description */}
      <p>{task.name}</p>
     
      {/* delete button to delete tasks */}
      <button
        className="absolute bottom-1 right-1 "
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};
