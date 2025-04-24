import { renderChatPage, renderMessages, saveMessage } from "../views/chat";
import { wsClient } from "../views/login";
import { MessageType } from "./websocket-client";
import { sendMessage } from "../views/chat";

export interface User {
    login: string;
    isLogined: boolean;
}

export let selectedUser: string | null = null;

export function userList(): void {
    const userListContainer = document.createElement('div');
    userListContainer.setAttribute('id', 'user-list');

    const searchInput = document.createElement('input');
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search users...");

    const usersList = document.createElement('ul');
    usersList.setAttribute('id', "users");

    userListContainer.appendChild(searchInput);
    userListContainer.appendChild(usersList);
    const chatContainer = document.getElementById("chat");
    console.log(chatContainer);
    
    chatContainer?.append(userListContainer);
    const userElements = document.querySelectorAll('.user');
    console.log(userElements);
  
} 

export function renderUserList(users: User[]): void {
       
    const currentUserData = sessionStorage.getItem('user');
    const currentUser = currentUserData ? JSON.parse(currentUserData).login : '';
    userList();
    const usersList = document.getElementById("users");
    if (!usersList) return;

    usersList.innerHTML = '';

    users
        .filter(user => user.login !== currentUser)
        .forEach(user => {
            const userItem = document.createElement('li');
            userItem.textContent = `${user.login}`;
            userItem.classList.add('user');
            userItem.setAttribute('id', user.login)
            usersList.appendChild(userItem);
            userItem.addEventListener('click', () => {
                console.log("user click")
                if (userItem instanceof HTMLElement) {
                selectedUser = userItem.id || null;
              
                renderMessages(selectedUser);
                const inputField = document.querySelector(".chat-input");
                const sendButton = document.querySelector(".chat-send-button");
                if (inputField instanceof HTMLInputElement && sendButton instanceof HTMLButtonElement) {
                inputField.disabled = false;
                sendButton.disabled = false;
                sendButton?.addEventListener("click", () => {
                    sendMessage(userItem.id, inputField.value)
                    renderMessages(userItem.id)
                })
                };
                
            };

                // inputField.disabled = false;
                // sendButton.disabled = false;
            });
            });
}

export function fetchAllUsers(): void {
    fetchUsers(MessageType.active);
    fetchUsers(MessageType.inactive);
    }

function fetchUsers(type: MessageType): void {
    const requestId = Math.random();
    wsClient.sendRequest({
        id: requestId + '',
        type: type,
        payload: null
    });
}
