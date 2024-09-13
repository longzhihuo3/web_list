// 初始化时加载任务
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-btn').addEventListener('click', addTask);

function addTask() {
    const taskText = document.getElementById('todo-input').value;
    const tagText = document.getElementById('tag-input').value || 'General';  // Default to 'General' if no tag is provided
    const dueDate = document.getElementById('due-date').value || null;
    if (taskText === '') return;

    const task = {
        text: taskText,
        completed: false,
        tag: tagText,
        dueDate: dueDate
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);

    // Clear input fields
    document.getElementById('todo-input').value = '';
    document.getElementById('tag-input').value = '';
    document.getElementById('due-date').value = '';
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (task.completed) {
        li.classList.add('completed');
    }
    li.innerHTML = `
        <span>${task.text} [${task.tag}] ${task.dueDate ? `Due: ${task.dueDate}` : ''}</span>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
    `;

    document.getElementById('todo-list').appendChild(li);

    li.querySelector('.complete-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
        updateTaskStatusInLocalStorage(task.text);
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(task.text);
    });

    if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const now = new Date();
        if (dueDate < now && !task.completed) {
            alert(`Task "${task.text}" is overdue!`);
        }
    }
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
}

function updateTaskStatusInLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


