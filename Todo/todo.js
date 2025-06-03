function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  if (taskInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = taskInput.value;
    li.classList.add("task"); // Add the 'task' class to the li
    // Add click event listener to toggle 'completed' class
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

function clearTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
}