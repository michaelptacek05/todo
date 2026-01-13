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
const buttonElement = document.querySelector(".add");
const listElement = document.querySelector(".todoList");

function render() {
    listElement.innerHTML = "";

    myProject.todos.forEach((todo) => {
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
        span.textContent = ` ${todo.title} (${todo.priority}) `;
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
    if (text != "") {
        const newTodo = new Todo(text, "Popis...", "10.4.1998", "Střední");
        myProject.addTodo(newTodo);
        inputElement.value = "";
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