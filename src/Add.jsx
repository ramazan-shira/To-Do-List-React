import { useState } from "react";
import "./style.css";

const Add = (props) => {
  const { tasks, setTasks } = props;
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  const addTask = () => {
    if (
      tasks.find(
        (element) =>
          element.title.toLocaleLowerCase() === title.toLocaleLowerCase()
      )
    ) {
      setError("Task already exists");
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: title,
      checked: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setError("");
  };

  return (
    <>
      <div className="add-task">
        <h1>Add Task</h1>
        <div className="input">
          <input
            type="text"
            placeholder="Enter your task"
            value={title}
            onChange={handleInput}
          />

          <button className="add" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default Add;
