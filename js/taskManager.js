import dataManager from './dataManager.js';

const taskManager = (function () {
    let tasks = [];

    function loadTasks() {
        tasks = dataManager.loadTasks();
        return tasks;
    }

    function addTask(taskText) {
        tasks.push({ text: taskText, completed: false });
        dataManager.saveTasks(tasks);
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        dataManager.saveTasks(tasks);
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        dataManager.saveTasks(tasks);
    }

    function editTask(index, newTaskText) {
        tasks[index].text = newTaskText;
        dataManager.saveTasks(tasks);
    }

    function getTasks() {
        return tasks;
    }

    return {
        loadTasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        getTasks,
    };
})();

export default taskManager;
