let tasks = [];

// Load tasks from localStorage on page load
window.onload = function () {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
};

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasksToLocalStorage();
        renderTasks();
        taskInput.value = '';
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
}

function openEditModal(index) {
    const editTaskInput = document.getElementById('editTaskInput');
    editTaskInput.value = tasks[index].text;

    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
    const saveEditBtn = document.getElementById('saveEditBtn');

    saveEditBtn.onclick = function() {
        const newTaskText = editTaskInput.value.trim();
        if (newTaskText !== '') {
            tasks[index].text = newTaskText;
            saveTasksToLocalStorage();
            renderTasks();
            modal.style.display = 'none';
        } else {
            alert('Invalid input. Please enter a valid task text.');
        }
    };
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.className = 'custom-checkbox';
        checkbox.onclick = () => toggleTask(index);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.className = task.completed ? 'task-text completed' : 'task-text';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => openEditModal(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

renderTasks();
