import React, { useEffect, useState } from "react";
import { Section } from "./Section";

function ListTasks({ tasks, setTasks }) {
  // state to store tasks respective to the status["todos","inProgress","closed"]
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);
  const [blocked, setBlocked] = useState([]);

  // whenever the task is changed or created useEffect will call because we mention [tasks] as dependency
  useEffect(() => {
    //   console.log(tasks);
    // filtering the tasks respective to the status
    const fTodos = tasks?.filter((task) => task.status === "todo");
    const fInProgress = tasks?.filter((task) => task.status === "inprogress");
    const fClosed = tasks?.filter((task) => task.status === "closed");
    const fBlocked = tasks?.filter((task) => task.status === "blocked");

    // after filtering, set the tasks to respective states
    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
    setBlocked(fBlocked);
  }, [tasks]);

  // status in our application
  const statuses = ["todo", "inprogress", "closed", "blocked"];

  return (
    <div className="container justify-center flex gap-20">
      {/* Section is a component acts a column for todo inProgress and closed */}
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
          blocked={blocked}
        />
      ))}
    </div>
  );
}

export default ListTasks;
