import { Socket } from "dgram";
import { renderAboutPage } from "./about";
import { renderChatPage } from "./chat";
import { WebSocketClient } from "../components/websocket-client";

export function renderLoginPage() {
    if (isAuthenticated()) {
        renderChatPage();
        return;
    }

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

    const loginError = document.createElement('div');
    loginError.style.color = "red";

    const passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "password");
    passwordLabel.textContent = "Password";

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('id', 'password');
    passwordInput.setAttribute('name', 'password');

    const passwordError = document.createElement('div');
    passwordError.style.color = "red";

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Login";

    const aboutButton = document.createElement("button");
    aboutButton.setAttribute("type", "button");
    aboutButton.textContent = "About app"

    form.appendChild(loginLabel);
    form.appendChild(loginInput);
    form.appendChild(loginError);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(passwordError);
    form.appendChild(submitButton);
    form.appendChild(aboutButton);

    document.body.appendChild(title);
    document.body.appendChild(form);

    function validateLogin(value: string): string | null {
        if (value.length < 4) return "Login must be at least 4 characters long";
        if (!/^[a-zA-Z0-9]+$/.test(value)) return "Login must contain only letters and numbers.";
        return null;
    }

    function validatePassword(value:string): string | null {
        if (value.length < 6) return "Password must be at least 6 characters long";
        if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) return "password must include numbers and letters";
        return null;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const login = loginInput.value.trim();
        const password = passwordInput.value

        const loginValidation = validateLogin(login);
        const passwordValidation = validatePassword(password);

        loginError.textContent = loginValidation ?? "";
        passwordError.textContent = passwordValidation ?? "";
        console.log("Перед перевіркою валідності пароля та логіну");
        if (!loginValidation && !passwordValidation) {
            console.log("smth")
            try {
                const success = await authenticateUser(wsClient, login, password);
                if (success) {
                    renderChatPage();
                }
            } catch {
                console.log("Authentication failed.");
            }
        }
    });

    form.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            submitButton.click();
        }
    });

    aboutButton.addEventListener("click", () => {
        renderAboutPage();
    });

}

export function isAuthenticated(): boolean {
    const userData =  localStorage.getItem("user");
    if (!userData) return false;
    try {
        const user = JSON.parse(userData);
        return user.isLogined === true;
    }
    catch {
        return false;
    }

}

export const wsClient = new WebSocketClient();

async function authenticateUser(wsClient: WebSocketClient, login: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const requestId = `${Date.now()}`;
        const request = {
            id: requestId,
            type: "USER_LOGIN",
            payload: {
                user: {
                    login,
                    password,
                }
            }
        };

        const handleMessage = (event: MessageEvent) => {
            console.log("Отримано повідомлення від сервера:", event.data);
            const response = JSON.parse(event.data);

            if (response.id !== request.id) {
                console.log("Це не наша відповідь, ігноруємо.");
            return;
            }

            if (response.type === "USER_LOGIN" && response.payload.user.isLogined) {
                console.log("Авторизація успішна!");
                localStorage.setItem('user', JSON.stringify(response.payload.user));
                resolve(true);
            } else if (response.type === "ERROR") {
                console.log("Сервер повернув помилку:", response.payload.error);
                displayError(response.payload.error);
                reject(false);
            }

            wsClient['socket'].removeEventListener('message', handleMessage);
        };
        wsClient['socket'].addEventListener('message', handleMessage)
        
        wsClient.send(request);


    });
}

function displayError(message: string): void {
    let errorElement = document.getElementById('login-error') as HTMLDivElement;

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'login-error';
        errorElement.style.color = 'red';
        document.body.appendChild(errorElement);
    }

    errorElement.textContent = message;
}