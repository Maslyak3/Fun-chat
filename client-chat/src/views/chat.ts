export function renderChatPage() {
    document.body.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = `Fun chat............ user`;

    const chatContainer = document.createElement("div");
    chatContainer.setAttribute('id', 'chat');

    const welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = "Welcome to the chat!";

    chatContainer.appendChild(welcomeMessage);
    document.body.appendChild(title);

    document.body.append(chatContainer);
}