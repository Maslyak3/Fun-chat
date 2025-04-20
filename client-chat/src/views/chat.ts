import { userList, renderUserList, fetchAllUsers, User } from "../components/user-list";
import { renderAboutPage } from "./about";
import { renderLoginPage, wsClient } from "./login";

let selectedUser: string | null = null;
let unreadMessages: { [userId: string]: boolean } = {};
export let username: string;


export function renderChatPage() {
    const userData = sessionStorage.getItem('user');
    username = userData ? JSON.parse(userData).login : "Guest"
    document.body.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = `Fun chat - ${username}`;

    const chatContainer = document.createElement("div");
    chatContainer.setAttribute('id', 'chat');

    const messageWindow = document.createElement("div");
    messageWindow.setAttribute('id', 'message-window');

    const welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = `Welcome to the chat, ${username}!`;

    const messageView = document.createElement("div");
    messageView.setAttribute('id', 'message-view');

    const form = document.createElement('form');
    form.className = 'chat-form';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Type your message...';
    inputField.className = 'chat-input';
    inputField.setAttribute('size', '60')
    inputField.disabled = true;

    const sendButton = document.createElement('button');
    sendButton.type = 'submit';
    sendButton.textContent = 'Send';
    sendButton.className = 'chat-send-button';
    sendButton.disabled = true;
    
    
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";

    const aboutButton = document.createElement("button");
    aboutButton.setAttribute("type", "button");
    aboutButton.textContent = "About app"

    form.appendChild(inputField);
    form.appendChild(sendButton);
    messageWindow.appendChild(welcomeMessage);
    messageWindow.appendChild(messageView);
    messageWindow.append(form);
    chatContainer.appendChild(messageWindow);
    title.appendChild(logoutBtn);
    title.appendChild(aboutButton);
    document.body.appendChild(title);
    document.body.append(chatContainer);

    aboutButton.addEventListener("click", renderAboutPage);

    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem('user');
        wsClient.close();
        renderLoginPage();
    });
  
    // form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     if (selectedUser && inputField.value.trim() !== "") {
    //         sendMessage(selectedUser, inputField.value.trim());
    //         inputField.value = '';
    //         console.log(selectedUser)
    //     }
    // });

    // inputField.addEventListener('keypress', (event) => {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         if (selectedUser && inputField.value.trim() !== "") {
    //             sendMessage(selectedUser, inputField.value.trim());
    //         }
    //     }
    // });
}

export function renderMessages(userId: string | null): void {
    const messageView = document.getElementById('message-view');
    if (!messageView) return;

    messageView.innerHTML = "";
    const messages = getMessagesForUser(userId);
        
    messages.forEach((message: {text: string, timestamp: string}) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.timestamp}: ${message.text}`;
        messageView.appendChild(messageElement);
    });

    if (userId) {
        unreadMessages[userId] = false;
    }
    updateUserList();
}

export function sendMessage(userId: string, messageText: string) {
    const message = {
        to: userId,
        from: username,
        text: messageText,
        timestamp: new Date().toLocaleTimeString(),
    };
    saveMessage(userId, message);
    renderMessages(userId);
}

function getMessagesForUser(userId: string | null) {
   const result = JSON.parse(localStorage.getItem(`messages_${userId}`) || '[]');
   console.log(result);
   return result;
   
}

export function saveMessage(userId: string, message: {text: string, timestamp: string}) {
    const messages = getMessagesForUser(userId);
    messages.push(message);
    localStorage.setItem(`messages_${userId}`, JSON.stringify(messages));
}

function updateUserList() {
    const userElements = document.querySelectorAll('.user');
    userElements.forEach((userElement) => {
        if (userElement instanceof HTMLElement) {
        const userId = userElement.dataset.userId;
        if (userId && unreadMessages[userId]) {
            userElement.classList.add('unread');
        } else {
            userElement.classList.remove('unread');
        }
    }
    });
}

function highlightUnreadMessages() {
    const userElements = document.querySelectorAll('.user');
    userElements.forEach((element) => {
        if (element instanceof HTMLElement) {
            const userId = element.dataset.id;
            if (userId && unreadMessages[userId]) {
                element.classList.add('highlight');
            } else {
            element.classList.remove('highlight');
        }
    }
    })
}


