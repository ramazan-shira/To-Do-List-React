import { useState } from "react";
import Add from "./Add";
import "./style.css";
import List from "./List";
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);

  const [isOnEdit, setIsOnEdit] = useState(false);

  const [taskOnEdit, setTaskOnEdit] = useState();

  return (
    <div className="app-container">
      <Add tasks={tasks} setTasks={setTasks} />
      <List
        tasks={tasks}
        setTasks={setTasks}
        taskOnEdit={taskOnEdit}
        isOnEdit={isOnEdit}
        setIsOnEdit={setIsOnEdit}
        setTaskOnEdit={setTaskOnEdit}
      />
    </div>
  );
};

export default ToDoList;
