// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const clearBtn = document.getElementById('clearBtn');

// State
let isProcessing = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    messageInput.focus();
    updateSendButton();
});

// Update send button state
function updateSendButton() {
    const hasMessage = messageInput.value.trim().length > 0;
    sendButton.disabled = !hasMessage || isProcessing;
    console.log('Button state:', sendButton.disabled, 'hasMessage:', hasMessage, 'isProcessing:', isProcessing);
}

// Auto-resize textarea
messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 200) + 'px';
    
    // Enable/disable send button
    updateSendButton();
});

// Send message on Enter (Shift+Enter for new line)
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Send button click
sendButton.addEventListener('click', (e) => {
    console.log('Send button clicked');
    e.preventDefault();
    sendMessage();
});

// Clear conversation
clearBtn.addEventListener('click', async () => {
    if (confirm('Clear conversation history?')) {
        try {
            await fetch('/clear', { method: 'POST' });
            clearChat();
        } catch (error) {
            console.error('Error clearing chat:', error);
        }
    }
});

// Clear chat UI
function clearChat() {
    chatContainer.innerHTML = `
        <div class="welcome-message">
            <div class="sparkle-icon">✨</div>
            <h2>Hi, I'm your AI Assistant</h2>
            <p>I can help you explore files, answer questions, and assist with various tasks. How can I help you today?</p>
        </div>
    `;
}

// Send message to backend
async function sendMessage() {
    const message = messageInput.value.trim();
    
    console.log('sendMessage called with:', message);
    
    if (!message || isProcessing) {
        console.log('Message empty or processing, returning');
        return;
    }
    
    // Remove welcome message if exists
    const welcomeMessage = chatContainer.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    isProcessing = true;
    updateSendButton();
    
    // Show loading indicator
    const loadingMessage = addLoadingMessage();
    
    try {
        console.log('Sending request to /chat');
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        
        console.log('Response received:', response.status);
        const data = await response.json();
        console.log('Data:', data);
        
        // Remove loading indicator
        loadingMessage.remove();
        
        if (data.error) {
            addErrorMessage(data.error);
        } else {
            addMessage(data.response, 'assistant');
        }
    } catch (error) {
        // Remove loading indicator
        loadingMessage.remove();
        addErrorMessage('Failed to connect to server. Please check your connection.');
        console.error('Error:', error);
    } finally {
        isProcessing = false;
        updateSendButton();
        messageInput.focus();
    }
}

// Add message to chat
function addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${role}-avatar`;
    
    if (role === 'user') {
        avatar.textContent = 'MM';
    } else {
        avatar.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
        `;
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return messageDiv;
}

// Add loading message
function addLoadingMessage() {
    const template = document.getElementById('loadingTemplate');
    const loadingMessage = template.content.cloneNode(true).querySelector('.message');
    chatContainer.appendChild(loadingMessage);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return chatContainer.lastElementChild;
}

// Add error message
function addErrorMessage(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `Error: ${error}`;
    chatContainer.appendChild(errorDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

