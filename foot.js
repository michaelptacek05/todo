class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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
