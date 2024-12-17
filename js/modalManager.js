import taskManager from './taskManager.js';
import uiManager from './uiManager.js';

const modalManager = (function () {
    const editModal = document.getElementById('editModal');
    const editTaskInput = document.getElementById('editTaskInput');
    const saveEditBtn = document.getElementById('saveEditBtn');
    let editIndex = null; // Keep track of the task being edited

    function openEditModal(index) {
        const tasks = taskManager.getTasks();
        editTaskInput.value = tasks[index].text;
        editModal.style.display = 'block';
        editIndex = index;
    }

    function closeEditModal() {
        editModal.style.display = 'none';
        editIndex = null;
    }

    saveEditBtn.onclick = () => {
        const newTaskText = editTaskInput.value.trim();
        if (newTaskText && editIndex !== null) {
            taskManager.editTask(editIndex, newTaskText);
            uiManager.renderTasks();
            closeEditModal();
        }
    };

    // Close modal on outside click
    window.onclick = (e) => {
        if (e.target === editModal) closeEditModal();
    };

    return { openEditModal, closeEditModal };
})();

export default modalManager;
