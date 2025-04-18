import { wsClient } from "../views/login";
import { MessageType } from "./websocket-client";

export interface User {
    login: string;
    isLogined: boolean;
}

export function userList(): HTMLElement {
    const userListContainer = document.createElement('div');
    userListContainer.setAttribute('id', 'user-list');

    const searchInput = document.createElement('input');
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search users...");

    const usersList = document.createElement('ul');
    usersList.setAttribute('id', "users");

    userListContainer.appendChild(searchInput);
    userListContainer.appendChild(usersList);
    return userListContainer;
} 

export function renderUserList(users: User[]): void {
    const currentUserData = sessionStorage.getItem('user');
    const currentUser = currentUserData ? JSON.parse(currentUserData).login : '';

    const usersList = document.getElementById("users");
    if (!usersList) return;

    usersList.innerHTML = '';

    users
        .filter(user => user.login !== currentUser)
        .forEach(user => {
            const userItem = document.createElement('li');
            userItem.textContent = `${user.login}`;
            usersList.appendChild(userItem);
        });
}

export function fetchAllUsers(): void {
    // const active = await fetchUsers("USER_ACTIVE");
    // console.log(active);
    
    // const inactive = await fetchUsers("USER_INACTIVE");
    fetchUsers(MessageType.active);
    fetchUsers(MessageType.inactive);
    //return [...active, ...inactive];
}

function fetchUsers(type: MessageType): void {
    console.log('fetchUsers');
    const requestId = Math.random();
    wsClient.sendRequest({
        id: requestId + '',
        type: type,
        payload: null
    });
}

// function fetchUsers(type: "USER_ACTIVE" | "USER_INACTIVE"): Promise<User[]> {
//     console.log('fetchUsers');
    
//     return new Promise((resolve) => {
//         const requestId = Math.random();

//         wsClient.sendRequest({
//            id: requestId + '',
//            type: type,
//            payload: null
//         }, resolve);
        
//     });
// }