import { useDrop } from "react-dnd";
import { Header } from "./Header";
import { Task } from "./Task";
import { toast } from "react-hot-toast";

export const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  // drop functionality
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // function for addItemToSection
  const addItemToSection = (id) => {
    // console.log("dropped", id);
    setTasks((prevTasks) => {
      const modifiedTask = prevTasks.map((task) => {
        // modify the status
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(modifiedTask));
      toast.success("Task status changed");
      return modifiedTask;
    });
  };

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

  return (
    <div className={`w-64`} ref={drop}>
      <Header text={text} bg={bg} count={tasksToMap?.length} />
      {tasksToMap?.length > 0 &&
        tasksToMap?.map((task, index) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};
