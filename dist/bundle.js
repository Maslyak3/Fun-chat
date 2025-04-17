/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-chat/src/index.ts":
/*!**********************************!*\
  !*** ./client-chat/src/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router/router */ \"./client-chat/src/router/router.ts\");\n\n(0,_router_router__WEBPACK_IMPORTED_MODULE_0__.initRouter)();\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/index.ts?");

/***/ }),

/***/ "./client-chat/src/router/router.ts":
/*!******************************************!*\
  !*** ./client-chat/src/router/router.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initRouter: () => (/* binding */ initRouter)\n/* harmony export */ });\n/* harmony import */ var _views_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/login */ \"./client-chat/src/views/login.ts\");\n/* harmony import */ var _views_about__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/about */ \"./client-chat/src/views/about.ts\");\n/* harmony import */ var _views_chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/chat */ \"./client-chat/src/views/chat.ts\");\n\n\n\nfunction initRouter() {\n    window.addEventListener('hashchange', handleRouteChange);\n    handleRouteChange(); // Викликаємо для першого рендерингу\n    function handleRouteChange() {\n        const route = window.location.hash.slice(1); // Отримуємо частину URL після #\n        switch (route) {\n            case 'login':\n                (0,_views_login__WEBPACK_IMPORTED_MODULE_0__.renderLoginPage)();\n                break;\n            case 'about':\n                (0,_views_about__WEBPACK_IMPORTED_MODULE_1__.renderAboutPage)();\n                break;\n            case 'chat':\n                (0,_views_chat__WEBPACK_IMPORTED_MODULE_2__.renderChatPage)();\n                break;\n            default:\n                (0,_views_login__WEBPACK_IMPORTED_MODULE_0__.renderLoginPage)(); // За замовчуванням — сторінка авторизації\n        }\n    }\n}\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/router/router.ts?");

/***/ }),

/***/ "./client-chat/src/views/about.ts":
/*!****************************************!*\
  !*** ./client-chat/src/views/about.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderAboutPage: () => (/* binding */ renderAboutPage)\n/* harmony export */ });\nfunction renderAboutPage() {\n    document.body.innerHTML = \"\";\n    const title = document.createElement(\"h1\");\n    title.textContent = \"About\";\n    const aboutContent = document.createElement('p');\n    aboutContent.textContent = \"This is page about this app which was created by Roman Masliak using typescript and Websocket\";\n    document.body.appendChild(title);\n    document.body.appendChild(aboutContent);\n}\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/views/about.ts?");

/***/ }),

/***/ "./client-chat/src/views/chat.ts":
/*!***************************************!*\
  !*** ./client-chat/src/views/chat.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderChatPage: () => (/* binding */ renderChatPage)\n/* harmony export */ });\nfunction renderChatPage() {\n    document.body.innerHTML = \"\";\n    const title = document.createElement(\"h1\");\n    title.textContent = `Fun chat............ user`;\n    const chatContainer = document.createElement(\"div\");\n    chatContainer.setAttribute('id', 'chat');\n    const welcomeMessage = document.createElement('p');\n    welcomeMessage.textContent = \"Welcome to the chat!\";\n    chatContainer.appendChild(welcomeMessage);\n    document.body.appendChild(title);\n    document.body.append(chatContainer);\n}\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/views/chat.ts?");

/***/ }),

/***/ "./client-chat/src/views/login.ts":
/*!****************************************!*\
  !*** ./client-chat/src/views/login.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLoginPage: () => (/* binding */ renderLoginPage)\n/* harmony export */ });\nfunction renderLoginPage() {\n    document.body.innerHTML = \"\";\n    const title = document.createElement(\"h1\");\n    title.textContent = \"Login page\";\n    const form = document.createElement(\"form\");\n    const loginLabel = document.createElement(\"label\");\n    loginLabel.setAttribute(\"for\", \"login\");\n    loginLabel.textContent = \"Login\";\n    const loginInput = document.createElement(\"input\");\n    loginInput.setAttribute(\"type\", \"text\");\n    loginInput.setAttribute(\"id\", \"login\");\n    loginInput.setAttribute(\"name\", \"login\");\n    const passwordLabel = document.createElement(\"label\");\n    passwordLabel.setAttribute(\"for\", \"password\");\n    passwordLabel.textContent = \"Password\";\n    const passwordInput = document.createElement('input');\n    passwordInput.setAttribute('type', 'password');\n    passwordInput.setAttribute('id', 'password');\n    passwordInput.setAttribute('name', 'password');\n    const submitButton = document.createElement(\"button\");\n    submitButton.setAttribute(\"type\", \"submit\");\n    submitButton.textContent = \"Login\";\n    form.appendChild(loginLabel);\n    form.appendChild(loginInput);\n    form.appendChild(passwordLabel);\n    form.appendChild(passwordInput);\n    form.appendChild(submitButton);\n    document.body.appendChild(title);\n    document.body.appendChild(form);\n}\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/views/login.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client-chat/src/index.ts");
/******/ 	
/******/ })()
;