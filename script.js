
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

let tasks = [];

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const title = taskInput.value.trim();

    if (title === "") {
        alert("Please enter a task");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        const div = document.createElement("div");

        span.textContent = task.title;

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteButton");

        editButton.textContent = "Edit";
        editButton.classList.add("editButton");

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((item) => item.id !== task.id);
            renderTasks();
        });

        editButton.addEventListener("click", () => {
            const newTitle = prompt("Enter new task title:", task.title);

            if (newTitle === null || newTitle.trim() === "") {
                return;
            }

            tasks = tasks.map((item) => {
                if (item.id === task.id) {
                    return {
                        ...item,
                        title: newTitle.trim()
                    };
                }

                return item;
            });

            renderTasks();
        });

        if (task.completed) {
            span.classList.add("completed");
        }

        const button = document.createElement("button");
        button.textContent = task.completed ? "Undo" : "Done";

        button.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(div);

        div.appendChild(button);
        div.appendChild(editButton);
        div.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}
