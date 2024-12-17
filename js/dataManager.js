const dataManager = (function () {
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    return {
        loadTasks,
        saveTasks,
    };
})();

export default dataManager;
