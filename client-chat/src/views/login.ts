export function renderLoginPage() {
    document.body.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = "Login page";

    const form = document.createElement("form");

    const loginLabel = document.createElement("label");
    loginLabel.setAttribute("for", "login");
    loginLabel.textContent = "Login";

    const loginInput = document.createElement("input");
    loginInput.setAttribute("type", "text");
    loginInput.setAttribute("id", "login");
    loginInput.setAttribute("name", "login");

    const passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "password");
    passwordLabel.textContent = "Password";

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('id', 'password');
    passwordInput.setAttribute('name', 'password');

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Login";

    form.appendChild(loginLabel);
    form.appendChild(loginInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(submitButton);

    document.body.appendChild(title);
    document.body.appendChild(form);

}