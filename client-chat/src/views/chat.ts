import { userList, renderUserList, fetchAllUsers } from "../components/user-list";
import { renderAboutPage } from "./about";
import { renderLoginPage, wsClient } from "./login";

export function renderChatPage() {
    const userData = sessionStorage.getItem('user');
    const username = userData ? JSON.parse(userData).login : "Guest"
    console.log(userData)
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

    const sendButton = document.createElement('button');
    sendButton.type = 'submit';
    sendButton.textContent = 'Send';
    sendButton.className = 'chat-send-button';
    
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
    
    const userListElement = userList();
    chatContainer.appendChild(userListElement);
    fetchAllUsers();
   }

