import { wsClient } from "../views/login";

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

export async function fetchAllUsers(): Promise<User[]> {
    const active = await fetchUsers("USER_ACTIVE");
    const inactive = await fetchUsers("USER_INACTIVE");
    return [...active, ...inactive];
}

function fetchUsers(type: "USER_ACTIVE" | "USER_INACTIVE"): Promise<User[]> {
    return new Promise((resolve) => {
        const requestId = Math.random();

        wsClient.sendRequest({
           id: requestId + '',
           type: type,
           payload: null
        }, resolve);
        
    });
}