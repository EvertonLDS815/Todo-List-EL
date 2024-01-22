const input = document.querySelector('.input');
const button = document.querySelector('.button');
const completeList = document.querySelector('.list-container');

let list = [];

function addTask() {

    if (input.value === '') {
        alert('Digite alguma tarefa!');
        return;
    }
    list.push({
        task: input.value,
        finished: false
    });

    
    input.value = '';
    showTask();
}

function showTask() {
    
    let newLi = '';

    list.forEach((item, index) => {
        newLi = newLi + `
        <li class="item ${item.finished === true && 'active'}">
            <button class="edit-button" onclick="finishedTask(${index})"><i class='bx bxs-edit-alt'></i></button>
            <span>${item.task}</span>
            <button class="trash-button" onclick="deleteItem(${index})"><i class='bx bxs-trash-alt'></i></button>
        </li>`
    });

    completeList.innerHTML = newLi;

    localStorage.setItem('todoList', JSON.stringify(list))
}

function finishedTask(index) {
    list[index].finished = !list[index].finished;
    console.log(list[index])
    showTask();
}

function deleteItem(index) {
    list.splice(index, 1);

    showTask();
}

function loadTasks() {
    const tasks = localStorage.getItem('todoList');

    if (tasks) {
        list = JSON.parse(tasks);
    }

    showTask();
}

function addByEnter({key}) {
    if (key === "Enter") {
        addTask()
    }
}

loadTasks();

button.addEventListener('click', addTask);
input.addEventListener("keypress", addByEnter)