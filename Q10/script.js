// DOM Elements
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const removeLastBtn = document.getElementById('removeLastBtn');
const removeFirstBtn = document.getElementById('removeFirstBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const taskCounter = document.getElementById('taskCounter');
const priorityButtons = document.querySelectorAll('.priority-btn');

// State
let tasks = [];
let taskIdCounter = 1;
let selectedPriority = 'medium';

// Task Class
class Task {
    constructor(text, priority = 'medium') {
        this.id = taskIdCounter++;
        this.text = text;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
    }
}

// Initialize the application
function init() {
    updateTaskCounter();
    updatePrioritySelection();
    addEventListeners();
    
    // Add some sample tasks for demonstration
    addSampleTasks();
}

// Add sample tasks
function addSampleTasks() {
    const sampleTasks = [
        { text: 'Complete JavaScript project', priority: 'high' },
        { text: 'Review code documentation', priority: 'medium' },
        { text: 'Organize workspace', priority: 'low' }
    ];
    
    sampleTasks.forEach(task => {
        addTask(task.text, task.priority);
    });
}

// Event Listeners
function addEventListeners() {
    addBtn.addEventListener('click', handleAddTask);
    removeLastBtn.addEventListener('click', removeLastTask);
    removeFirstBtn.addEventListener('click', removeFirstTask);
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
    
    // Priority selection
    priorityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedPriority = btn.dataset.priority;
            updatePrioritySelection();
        });
    });
}

// Handle adding a new task
function handleAddTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        showNotification('Please enter a task!', 'warning');
        taskInput.focus();
        return;
    }
    
    if (taskText.length > 100) {
        showNotification('Task text is too long! (Max 100 characters)', 'warning');
        return;
    }
    
    addTask(taskText, selectedPriority);
    taskInput.value = '';
    taskInput.focus();
    showNotification('Task added successfully!', 'success');
}

// Add a new task
function addTask(text, priority = 'medium') {
    const task = new Task(text, priority);
    tasks.push(task);
    renderTask(task);
    updateTaskCounter();
    updateButtonStates();
}

// Render a single task
function renderTask(task) {
    const li = document.createElement('li');
    li.className = `task-item priority-${task.priority}`;
    li.dataset.taskId = task.id;
    
    if (task.completed) {
        li.classList.add('completed');
    }
    
    li.innerHTML = `
        <div class="task-content">
            <div class="task-text">${escapeHtml(task.text)}</div>
            <div class="task-meta">
                <span>Priority: <strong>${task.priority.toUpperCase()}</strong></span>
                <span>Created: ${formatDate(task.createdAt)}</span>
            </div>
        </div>
        <div class="task-actions">
            <button class="btn btn-success btn-small" onclick="toggleTask(${task.id})">
                ${task.completed ? 'Undo' : 'Done'}
            </button>
            <button class="btn btn-warning btn-small" onclick="editTask(${task.id})">
                Edit
            </button>
            <button class="btn btn-danger btn-small" onclick="removeTask(${task.id})">
                Delete
            </button>
        </div>
    `;
    
    taskList.appendChild(li);
    
    // Add animation
    li.style.animation = 'slideIn 0.3s ease-out';
}

// Remove last task
function removeLastTask() {
    if (tasks.length === 0) {
        showNotification('No tasks to remove!', 'warning');
        return;
    }
    
    const lastTask = tasks[tasks.length - 1];
    removeTask(lastTask.id);
}

// Remove first task
function removeFirstTask() {
    if (tasks.length === 0) {
        showNotification('No tasks to remove!', 'warning');
        return;
    }
    
    const firstTask = tasks[0];
    removeTask(firstTask.id);
}

// Remove specific task
function removeTask(taskId) {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskElement && taskIndex !== -1) {
        // Add removal animation
        taskElement.classList.add('removing');
        
        setTimeout(() => {
            taskElement.remove();
            tasks.splice(taskIndex, 1);
            updateTaskCounter();
            updateButtonStates();
            showNotification('Task removed!', 'success');
        }, 300);
    }
}

// Toggle task completion
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    
    if (task && taskElement) {
        task.completed = !task.completed;
        taskElement.classList.toggle('completed');
        
        // Update button text
        const toggleBtn = taskElement.querySelector('.btn-success');
        toggleBtn.innerHTML = task.completed ? 'Undo' : 'Done';
        
        updateTaskCounter();
        showNotification(task.completed ? 'Task completed!' : 'Task reopened!', 'success');
    }
}

// Edit task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        const newText = prompt('Edit task:', task.text);
        
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            renderAllTasks();
            showNotification('Task updated!', 'success');
        }
    }
}

// Clear all tasks
function clearAllTasks() {
    if (tasks.length === 0) {
        showNotification('No tasks to clear!', 'warning');
        return;
    }
    
    if (confirm(`Are you sure you want to delete all ${tasks.length} tasks?`)) {
        tasks = [];
        taskList.innerHTML = '';
        updateTaskCounter();
        updateButtonStates();
        showNotification('All tasks cleared!', 'success');
    }
}

// Render all tasks
function renderAllTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => renderTask(task));
}

// Update task counter
function updateTaskCounter() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    if (totalTasks === 0) {
        taskCounter.innerHTML = `
            <div class="empty-state">
                No tasks yet. Add your first task above!
            </div>
        `;
    } else {
        taskCounter.innerHTML = `
            Total: <strong>${totalTasks}</strong> | 
            Completed: <strong>${completedTasks}</strong> | 
            Pending: <strong>${pendingTasks}</strong>
        `;
    }
}

// Update button states
function updateButtonStates() {
    const hasItems = tasks.length > 0;
    removeLastBtn.disabled = !hasItems;
    removeFirstBtn.disabled = !hasItems;
    clearAllBtn.disabled = !hasItems;
}

// Update priority selection UI
function updatePrioritySelection() {
    priorityButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.priority === selectedPriority);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#333';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        default:
            notification.style.backgroundColor = '#007bff';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(date) {
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

window.toggleTask = toggleTask;
window.editTask = editTask;
window.removeTask = removeTask;

document.addEventListener('DOMContentLoaded', init);
