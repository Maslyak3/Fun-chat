import { renderAboutPage } from "./about";
import { renderLoginPage, wsClient } from "./login";

export function renderChatPage() {
    const userData = localStorage.getItem('user');
    const username = userData ? JSON.parse(userData).login : "Guest"
    document.body.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = `Fun chat - ${username}`;

    const chatContainer = document.createElement("div");
    chatContainer.setAttribute('id', 'chat');

    const welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = `Welcome to the chat, ${username}!`;

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";

    const aboutButton = document.createElement("button");
    aboutButton.setAttribute("type", "button");
    aboutButton.textContent = "About app"

    chatContainer.appendChild(welcomeMessage);
    title.appendChild(logoutBtn);
    title.appendChild(aboutButton);
    document.body.appendChild(title);
    document.body.append(chatContainer);

    aboutButton.addEventListener("click", renderAboutPage);

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem('user');
        wsClient.close();
        renderLoginPage();
    });
}