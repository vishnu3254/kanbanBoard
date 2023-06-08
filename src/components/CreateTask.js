import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-datepicker/dist/react-datepicker.css";

function CreateTask({ tasks, setTasks, onData }) {
  // states for Datepicker and time picker values
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("00:00");

  // state for creating a single indivdual task
  const [task, setTask] = useState({
    id: "",
    name: "",
    date: "",
    time: "",
    schedule: false,
    status: "todo",
  });

  // functions to handle time and date changes
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // console.log("handleDateChange", date);
    // formatting the date
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toLocaleDateString();

    const dateParts = formattedDate.split("/");
    const day = dateParts[1];
    const month = dateParts[0];
    const year = dateParts[2];
    formattedDate = `${year}/${month}/${day}`;

    // console.log("date after formatting", formattedDate);
    // setSelectedDate(formattedDate);

    setTask({ ...task, date: formattedDate });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setTask({ ...task, time: time });
  };

  // if the create button is pressed
  const handleSubmit = (e) => {
    // to prevent refresh
    e.preventDefault();

    // to check if the input field is empty
    if (task.name.length < 3 || task.name.trim() == "")
      return toast.error("A task must have more than 3 characters");
    if (task.time === "") return toast.error("Select time");
    // setTasks
    setTasks((tasks) => {
      const list = [...tasks, task];
      // set the task to localstorage
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });
    onData(task);

    // successtoast
    toast.success("Task added");
    // console.log("selected time", selectedTime);

    // console.log("after submit task is", task);
    // set back to null after submisson
    setSelectedDate(null);
    setSelectedTime("00:00");

    // set back to initial state to clear the input field
    setTask({
      id: "",
      name: "",
      time: "",
      date: "",
      time: "",
      status: "todo",
    });
  };

  return (
    <div>
      {/* form */}
      <form onSubmit={handleSubmit}>
        {/* input field */}
        <div className="container d-flex gap-1">
          <input
            type="text"
            placeholder="Enter Todo"
            id="task"
            value={task.name}
            required={true}
            onChange={(e) =>
              setTask({ ...task, id: uuidv4(), name: e.target.value })
            }
            className="border-2 border-slate-400 bg-slate-100 rounded-md h-12 w-64 ps-3"
          />
          {/* time */}
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Select Date"
            required={true}
            className="border-2 border-slate-400 bg-slate-100 rounded-md h-12 w-64 ps-3"
          />
          <TimePicker
            format="HH:mm"
            clearIcon={null}
            value={selectedTime}
            onChange={handleTimeChange}
            required={true}
            className="border-2 border-slate-400 bg-slate-100 rounded-md h-12 w-75 custom-clock  "
          />
          {/* button */}
          <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
