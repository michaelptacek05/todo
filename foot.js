class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodo(todoTitle) {
        return this.todos.find((todo) => todo.title === todoTitle);
    }

    filterTodo(todoPriority) {
        return this.todos.filter((todo) => todo.priority === todoPriority);
    }

    deleteTodo(todo) {
        const index = this.todos.indexOf(todo);

        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }

    changePriority(todoTitle, newPriority) {
        const todo = this.getTodo(todoTitle);

        if (todo) {
            todo.priority = newPriority;
        }
    }
}

const myProject = new Project("Denní úkoly");

const inputElement = document.querySelector(".input");
const dateElement = document.querySelector(".date");
const priorityElement = document.querySelector(".priority");
const descriptionElement = document.querySelector(".description");
const buttonElement = document.querySelector(".add");
const listElement = document.querySelector(".todoList");
const filterElement = document.querySelector(".filter");

let currentFilter = "all";

if (filterElement) {
    filterElement.addEventListener("change", () => {
        currentFilter = filterElement.value;
        render();
    });
}

function render() {
    listElement.innerHTML = "";
    let tasksToRender = [];

    if (currentFilter === "all") {
        tasksToRender = myProject.todos;
    } else if (currentFilter === "active") {
        tasksToRender = myProject.todos.filter(
            (todo) => todo.completed === false
        );
    } else if (currentFilter === "completed") {
        tasksToRender = myProject.todos.filter(
            (todo) => todo.completed === true
        );
    }

    tasksToRender.forEach((todo) => {
        const newLi = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveToStorage();
            render();
        });

        const span = document.createElement("span");

        const dateText = todo.dueDate ? todo.dueDate : "Bez data";

        const descText = todo.description ? `(${todo.description})` : "";

        span.textContent = ` ${todo.title} (${todo.priority}) do ${dateText} Popis: ${descText}`;

        if (todo.completed) {
            span.classList.add("hotovo");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Smazat";
        deleteBtn.addEventListener("click", () => {
            myProject.deleteTodo(todo);
            saveToStorage();
            render();
        });

        newLi.appendChild(checkbox);
        newLi.appendChild(span);
        newLi.appendChild(deleteBtn);
        listElement.appendChild(newLi);
    });
}

buttonElement.addEventListener("click", () => {
    const text = inputElement.value;
    const date = dateElement.value;
    const description = descriptionElement.value;
    const priority = priorityElement.value;

    if (text != "") {
        const finalDate = date ? date : "Bez data";

        const newTodo = new Todo(text, description, finalDate, priority);

        myProject.addTodo(newTodo);

        inputElement.value = "";
        dateElement.value = "";
        descriptionElement.value = "";
        priorityElement.value = "Medium";

        saveToStorage();
        render();
    }
});

function saveToStorage() {
    const dataText = JSON.stringify(myProject.todos);
    localStorage.setItem("mojeUkoly", dataText);
}

const savedData = localStorage.getItem("mojeUkoly");

if (savedData) {
    myProject.todos = JSON.parse(savedData);
    render();
}
