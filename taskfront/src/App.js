import "./App.css";
import { useEffect, useState } from "react";
import {
  getAllTasks,
  sendTask,
  deleteTask,
  ToggleTick,
  sendUpdate,
} from "./api";
import {
  MdEditNote,
  MdDelete,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";

function App() {
  const [taskname, setTask] = useState("");
  const [tasks, setTaskList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(0);
  useEffect(async () => {
    const gettasks = await getAllTasks();
    // tasks = gettasks();
    setTaskList(gettasks);
    console.log(gettasks);
  }, []);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleClick = async (event) => {
    if (!editing) {
      var resp = await sendTask(taskname);
      if (resp) {
        setTaskList((tasks) => [...tasks, resp]);
      }
    } else {
      if (taskname == "") {
        alert("update cant be blank");
        return;
      }
      var resp = await sendUpdate(taskname, editId);
      if (resp) {
        setEditing((state) => !editing);
        setTaskList((tasks) => tasks.map((t) => (t._id != editId ? t : resp)));
      }
    }
  };

  const editTask = async (taskid) => {
    if (editing && editId !== taskid) {
      setEditId(taskid);
    }
    if (editing && editId == taskid) {
      setEditId(0);
      setEditing(false);
    } else {
      setEditing(true);
      setEditId(taskid);
    }
    setEditId(taskid);
    // var resp = await sendTask(taskname)
  };

  const handleDelete = async (taskid) => {
    // console.log(taskid);
    var resp = await deleteTask(taskid);
    if (resp) {
      setTaskList((tasks) => tasks.filter((task) => task._id != taskid));
    }
  };

  const handleTick = async (task) => {
    var resp = await ToggleTick(task);
    if (resp) {
      setTaskList((tasks) => tasks.map((t) => (t._id != task._id ? t : resp)));
    }
  };

  return (
    <div className="App">
      <div className="main">
        <div className="maintext">
          <h1>Task Manager</h1>
        </div>
        <div className="centerblob">
          <input
            type="text"
            id="task"
            name="task"
            value={taskname}
            onChange={handleChange}
            placeholder="Enter you task here.."
            size="30"
          />
          <button
            type="button"
            className="button"
            onClick={handleClick}
            style={
              editing
                ? { width: "10rem", height: "3rem" }
                : { width: "5rem", height: "2.5rem" }
            }
          >
            {editing ? "Submit Edit" : "Add"}
          </button>
        </div>
      </div>
      <div className="tasklist">
        {tasks &&
          tasks.map((task) => {
            return (
              <div
                className="singlet"
                style={
                  editing && task._id == editId
                    ? { backgroundColor: "#a1300d" }
                    : { backgroundColor: "#cf8e80" }
                }
              >
                {task.completed ? (
                  <div className="tick">
                    <MdCheckBox
                      className="box"
                      onClick={() => handleTick(task)}
                    />
                    <h1>
                      <del>{task.task}</del>
                    </h1>
                  </div>
                ) : (
                  <div className="tick">
                    {/* <button type="button" className="box"> */}
                    <MdCheckBoxOutlineBlank
                      className="box"
                      onClick={() => handleTick(task)}
                    />

                    {/* </button> */}
                    <h1>{task.task}</h1>
                  </div>
                )}
                <div className="tick">
                  <MdEditNote
                    className="edit"
                    onClick={() => editTask(task._id)}
                  />
                  <MdDelete
                    className="delete"
                    onClick={() => handleDelete(task._id)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
