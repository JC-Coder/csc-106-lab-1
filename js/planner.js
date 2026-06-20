const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskError = document.querySelector("#task-error");
const taskList = document.querySelector("#task-list");
const emptyTasks = document.querySelector("#empty-tasks");
const tasks = [];

// Renders the current task array after every add, complete, or delete action.
function renderTasks() {
  taskList.innerHTML = "";
  emptyTasks.hidden = tasks.length > 0;

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = task.completed ? "task-item completed" : "task-item";

    const taskLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    const taskTitle = document.createElement("span");
    const deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.title} as completed`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    taskTitle.textContent = task.title;
    taskLabel.append(checkbox, taskTitle);

    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
    deleteButton.addEventListener("click", () => {
      const taskIndex = tasks.findIndex((currentTask) => currentTask.id === task.id);
      tasks.splice(taskIndex, 1);
      renderTasks();
    });

    listItem.append(taskLabel, deleteButton);
    taskList.append(listItem);
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();

  if (!title) {
    taskError.textContent = "Enter a task before adding it.";
    taskInput.focus();
    return;
  }

  tasks.push({
    id: Date.now(),
    title,
    completed: false,
  });

  taskError.textContent = "";
  taskForm.reset();
  renderTasks();
  taskInput.focus();
});

taskInput.addEventListener("input", () => {
  if (taskInput.value.trim()) {
    taskError.textContent = "";
  }
});

renderTasks();
