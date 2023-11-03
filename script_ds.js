const todoFormm = document.getElementById("todoo");
let storedTasks = [];
const todoListt = document.getElementById("todoListt");

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
        todoListt.innerHTML = ''; // сначала очистим
        if (parsedTodos?.length > 0) {
            storedTasks = parsedTodos;
        }
        storedTasks.forEach(function (ToDoNode) {
            const task = JSON.parse(ToDoNode);
            const node = new Todo(task["task"], task["time"], task["isDone"], task["id"]);
            todoListt.appendChild(node.render());
        });
    }

    todoItemListener(event) {
        const current = event.target;
        const parentNode = current.closest("div");
        const isDeleteButton = event.target.closest(".todo__node_delete");
        const isDoneCheckBox = event.target.closest(".todo__node_checkbox");
        const parentNodeId = parentNode.id;
        const locStor = new LocStorage();
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

            locStor.setTodos(storedTasks);
            node.checkLocalStorage(locStor);

        } else if (isDoneCheckBox) {
            storedTasks.forEach(function (todo) {
                if (todo.id === parentNodeId) {
                    todo.done = !todo.done;
                }
            });

            locStor.setTodos(storedTasks);
            this.checkLocalStorage(locStor);
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
function addTask(todoListt) {
    var task = document.getElementById("taskInput").value;
    var time = todoFormm.querySelector("input[type='time']").value;
    var isDone = document.querySelector("input[type='checkbox']").checked;
    var todo = new Todo(task, time, isDone);

    todoListt.appendChild(todo.render());

    storedTasks.values(todo.getTasks());
    storedTasks.push(todo.getString());
    console.log(todo.getString());
    LocStor.setTodos(storedTasks);
}

//При обновлении страницы заполнить данными из LocalStorage
const LocStor = new LocStorage();
const LocStorList = new Todo();
LocStorList.checkLocalStorage(LocStor);