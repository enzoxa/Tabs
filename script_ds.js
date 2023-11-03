const todoFormm = document.getElementById("todoo");
let storedTasks = [];
const todoItems = document.getElementById("todoItems");

class LocStorage {
    constructor() {
        this.tasks = this.getTodos();
    }

    getTodos() {
        const ToDoLst = localStorage.getItem("tasks");
        const parsedTodos = JSON.parse(ToDoLst);
        return parsedTodos;
    }

    setTodos(ToDoLst) {
        localStorage.setItem("tasks", JSON.stringify(ToDoLst));
    }
}

class Todo {
    constructor(task, time, isDone, id) {
        this.task = task;
        this.time = time;
        this.isDone = isDone;
        this.id = id || Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    //Преобразование [] в JSON строку
    getString() {
        return JSON.stringify(this);
    }

    //Проверка LocalStorage и наполнение страницы
    checkLocalStorage() {
        const parsedTodos = new LocStorage().getTodos();
        todoItems.innerHTML = ''; // сначала очистим
        if (parsedTodos?.length > 0) {
            storedTasks = parsedTodos;
        }
        storedTasks.forEach(function (ToDoNode) {
            const task = JSON.parse(ToDoNode);
            const node = new Todo(task["task"], task["time"], task["isDone"], task["id"]);
            todoItems.appendChild(node.render());
        });
    }

    todoItemListener(event) {
        const current = event.target;
        const parentNode = current.closest("div");
        const isDeleteButton = event.target.closest(".todo__node_delete");
        const isDoneCheckBox = event.target.closest(".todo__node_checkbox");
        const parentNodeId = parentNode.id;
        const localStorage = new LocStorage();
        const node = new Todo();

        if (isDeleteButton) {
            // const foundElement = storedTasks.find(element => element === parentNodeId);
            // if (foundElement !== null) {
            //     storedTasks.delete(foundElement);
            // }
            storedTasks = storedTasks.filter(function (todo) {
                const task = JSON.parse(todo);
                return task["id"] !== parentNodeId;
            });

            localStorage.setTodos(storedTasks);
            node.checkLocalStorage(localStorage);

        } else if (isDoneCheckBox) {
            storedTasks.forEach(function (todo) {
                if (todo.id === parentNodeId) {
                    todo.done = !todo.done;
                }
            });

            localStorage.setTodos(storedTasks);
            this.checkLocalStorage(localStorage);
        }
    }
    //Описание элементов, которые будут добавлены на страницу
    render() {
        const div = document.createElement("div");
        div.className = "todo__node";
        div.id = this.id;

        const checkbox = document.createElement("input");
        checkbox.checked = this.isDone;
        checkbox.className = "todo__node_checkbox";
        checkbox.type = "checkbox";
        div.appendChild(checkbox);

        const textTask = document.createElement("p");
        textTask.textContent = this.task;
        textTask.className = "todo__node_text";
        div.appendChild(textTask);

        const time = document.createElement("span");
        time.textContent = this.time;
        time.className = "todo__node_time";
        div.appendChild(time);

        const buttonDel = document.createElement("button");
        buttonDel.textContent = "Удалить";
        buttonDel.className = "todo__node_delete";
        div.appendChild(buttonDel);
        div.addEventListener("click", this.todoItemListener);
        return div;
    }

    //Получение строки из localStorage
    getTasks() {
        return localStorage.getItem("tasks") || [];
    }    
}

//Добавление задачи в список на странице и сохранение в localStorage
function addTask(todoItems) {
    let task = document.getElementById("taskInput").value;
    let time = todoFormm.querySelector("input[type='time']").value;
    let isDone = document.querySelector("input[type='checkbox']").checked;
    let todo = new Todo(task, time, isDone);

    todoItems.appendChild(todo.render());

    storedTasks.values(todo.getTasks());
    storedTasks.push(todo.getString());
    console.log(todo.getString());
    localStorage.setTodos(storedTasks);
}

//При обновлении страницы заполнить данными из LocalStorage
const localStorage = new LocStorage();
const localStorageItems = new Todo();
localStorageItems.checkLocalStorage(localStorage);