import taskManager from './taskManager.js';
import modalManager from './modalManager.js';

const uiManager = (function () {
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');

    function renderTasks() {
        taskList.innerHTML = ''; // Clear the current list
        const tasks = taskManager.getTasks();

        tasks.forEach((task, index) => {
            const li = document.createElement('li');

            // Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.className = 'custom-checkbox';
            checkbox.onclick = () => {
                taskManager.toggleTask(index);
                renderTasks();
            };

            // Task Text
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.className = task.completed ? 'task-text completed' : 'task-text';

            // Edit Button
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.onclick = () => modalManager.openEditModal(index);

            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.onclick = () => {
                taskManager.deleteTask(index);
                renderTasks();
            };

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
    }

    function init() {
        // Initial load
        taskManager.loadTasks();
        renderTasks();

        // Add Task Button
        document.querySelector('.addTask').onclick = () => {
            const taskText = taskInput.value.trim();
            if (taskText) {
                taskManager.addTask(taskText);
                renderTasks();
                taskInput.value = '';
            }
        };
    }

    return { init, renderTasks };
})();

export default uiManager;
