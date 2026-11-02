
const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");
const taskCount = document.getElementById("task-count");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display all tasks on the page
function displayTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox to complete a task
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Complete task");

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task text
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", function () {
            const newText = prompt("Edit your task:", task.text);

            if (newText === null) {
                return;
            }

            if (newText.trim() === "") {
                alert("Task cannot be empty!");
                return;
            }

            task.text = newText.trim();
            saveTasks();
            displayTasks();
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item !== task;
            });

            saveTasks();
            displayTasks();
        });

        const actions = document.createElement("div");
        actions.className = "task-actions";
        actions.append(editButton, deleteButton);

        li.append(checkbox, span, actions);
        taskList.appendChild(li);
    }

    // Count tasks that are not completed
    const remaining = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCount.textContent = remaining + " tasks remaining";
}

// Add a new task
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();

    // Form validation
    if (taskText === "") {
        message.textContent = "Please enter a task first.";
        return;
    }

    message.textContent = "";

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    input.value = "";
    input.focus();
});

// Show saved tasks when the page opens
displayTasks();
