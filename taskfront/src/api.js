// const baseurl = process.env.HTTP_PROXY;
const axios = require("axios").default;
const baseurl = process.env.REACT_APP_HTTP_PROXY;
// console.log(process.env.REACT_APP_HTTP_PROXY);
console.log(baseurl);
export async function getAllTasks() {
  return await axios
    .get(baseurl + "/tasks")
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("HTTP status" + response.status);
      }
      // console.log(response);c
      return response.data;
    })
    .catch((error) => console.log(error));
}

export async function sendTask(task) {
  return await axios
    .post(baseurl + "/tasks", {
      task: task,
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("HTTP status" + response.status);
      }
      return response.data;
    })
    .catch((error) => console.log(error));
}

export async function deleteTask(taskid) {
  return await axios
    .delete(baseurl + `/tasks/${taskid}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("HTTP status" + response.status);
      }
      return response.data;
    })
    .catch((error) => console.log(error));
}

export async function ToggleTick(task) {
  return await axios
    .put(baseurl + `/tasks/${task._id}`, {
      completed: !task.completed,
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("HTTP status" + response.status);
      }
      return response.data;
    })
    .catch((error) => console.log(error));
}

export async function sendUpdate(taskname, editId) {
  return await axios
    .put(baseurl + `/tasks/${editId}`, {
      task: taskname,
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("HTTP status" + response.status);
      }
      return response.data;
    })
    .catch((error) => console.log(error));
}
