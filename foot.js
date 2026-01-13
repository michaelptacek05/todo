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
const listElement= document.querySelector(".todoList");

function render() {
    listElement.innerHTML = "";


    myProject.todos.forEach((todo) => {
        const newLi = document.createElement("li");
        newLi.textContent = `${todo.title} (${todo.priority})`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Smazat";

        deleteBtn.addEventListener("click", () => {
            myProject.deleteTodo(todo);
            render();   
        })
        

        listElement.appendChild(newLi);
        listElement.appendChild(deleteBtn);
    });
}

buttonElement.addEventListener("click", () => {
    const text = inputElement.value;

    if (text != "") {
        const newTodo = new Todo(text, "Popis...", "10.4.1998", "Střední");

        myProject.addTodo(newTodo);

        console.log("Přidáno:", newTodo);
        console.log("Celý seznam:", myProject.todos);

        inputElement.value = "";

        render();
    }
});
