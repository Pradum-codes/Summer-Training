// Get DOM elements
const messageElement = document.querySelector('.message');
const userInputElement = document.querySelector('.message-input');
const messageBox = document.querySelector('.message-box');

const defaultMessage = "Your Message will appear here";
const emptyMessage = "Please enter a message first!";

function updateMessage() {
    const inputValue = userInputElement.value.trim();
    
    if (inputValue === '') {
        messageElement.textContent = emptyMessage;
    } else {
        messageElement.textContent = inputValue;
    }
}

// Function to clear the message
function clearMessage() {
    userInputElement.value = '';
    messageElement.textContent = defaultMessage;
}

// Enter key functionality
userInputElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        updateMessage();
    }
});