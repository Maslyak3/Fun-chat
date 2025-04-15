import { renderLoginPage } from '../views/login';
import { renderAboutPage } from '../views/about';
import { renderChatPage } from '../views/chat';

export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange(); // Викликаємо для першого рендерингу

  function handleRouteChange() {
    const route = window.location.hash.slice(1); // Отримуємо частину URL після #
    
    switch (route) {
      case 'login':
        renderLoginPage();
        break;
      case 'about':
        renderAboutPage();
        break;
      case 'chat':
        renderChatPage();
        break;
      default:
        renderLoginPage(); // За замовчуванням — сторінка авторизації
    }
  }
}