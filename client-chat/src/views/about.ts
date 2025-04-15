export function renderAboutPage() {
    document.body.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = "About";

    const aboutContent = document.createElement('p');
    aboutContent.textContent = "This is page about this app which was created by Roman Masliak using typescript and Websocket";

    document.body.appendChild(title);
    document.body.appendChild(aboutContent);
}