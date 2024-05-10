import { useEffect, useState } from "react";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const List = (props) => {
  const { tasks, setTasks, setIsOnEdit, setTaskOnEdit, taskOnEdit, isOnEdit } =
    props;

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState(taskOnEdit?.title);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTitle = (e) => {
    setNewTitle(e.target.value);
  };

  useEffect(() => {
    if (taskOnEdit) {
      setNewTitle(taskOnEdit.title);
    }
  }, [taskOnEdit]);

  useEffect(() => {
    if (search === "") {
      setFilteredTasks(tasks);
    } else {
      const newTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTasks(newTasks);
    }
  }, [search]);

  const handleDelete = (id) => {
    const newList = tasks.filter((element) => element.id !== id);
    setTasks(newList);
  };

  const handleEdit = (task) => {
    setIsOnEdit(true);
    setTaskOnEdit(task);
  };

  const handleSave = () => {
    if (
      tasks.find(
        (element) =>
          element.title.toLocaleLowerCase() === newTitle.toLocaleLowerCase()
      )
    ) {
      alert("Task already exists");
      return;
    }
    const newTasks = tasks.map((task) => {
      if (task.id === taskOnEdit.id) {
        task.title = newTitle;
      }
      return task;
    });
    setTasks(newTasks);
    setIsOnEdit(false);
    setTaskOnEdit();
    setNewTitle("");
  };

  const handleCheck = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.checked = !task.checked;
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div className="tasks-list">
      <h2>List of Tasks</h2>
      {tasks.length > 0 && (
        <input
          type="text"
          placeholder="Search taks"
          className="search"
          value={search}
          onChange={handleSearch}
        />
      )}
      <ul className="list">
        {filteredTasks.map((task) => {
          const toEdit = isOnEdit && taskOnEdit.id === task.id;

          return (
            <li key={task.id}>
              <input
                type="checkbox"
                name="done"
                onChange={() => handleCheck(task.id)}
              />
              {toEdit ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitle}
                  className="change-title"
                />
              ) : (
                <p className={task.checked ? "checked" : "paragraph"}>
                  {task.title}
                </p>
              )}
              <div className="task-btn">
                <button>
                  {toEdit ? (
                    <i className="fa fa-check" onClick={handleSave}></i>
                  ) : (
                    <i
                      className="fa fa-edit"
                      onClick={() => handleEdit(task)}
                    ></i>
                  )}
                </button>
                <button>
                  <i
                    className="fa fa-trash"
                    onClick={() => handleDelete(task.id)}
                  ></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
