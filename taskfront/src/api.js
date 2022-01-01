var baseurl = "localhost:8000";
export async function getAllTasks() {
  return await fetch("/tasks", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("HTTP status" + resp.status);
      }
      return resp.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function sendTask(task) {
  return await fetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ task: task }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status" + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteTask(taskid) {
  return await fetch(`/tasks/${taskid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status" + response.status);
      }
      return response.json();
    })
    .catch((err) => console.log(err));
}

export async function ToggleTick(task) {
  return await fetch(`/tasks/${task._id}`, {
    method: "PUT",
    body: JSON.stringify({ completed: !task.completed }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status" + response.status);
      }
      return response.json();
    })
    .catch((err) => console.log(err));
}

export async function sendUpdate(taskname, editId) {
  return await fetch(`/tasks/${editId}`, {
    method: "PUT",
    body: JSON.stringify({ task: taskname }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status" + response.status);
      }
      return response.json();
    })
    .catch((err) => console.log(err));
}
