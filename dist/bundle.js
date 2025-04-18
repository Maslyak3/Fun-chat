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

/***/ "./client-chat/src/components/user-list.ts":
/*!*************************************************!*\
  !*** ./client-chat/src/components/user-list.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchAllUsers: () => (/* binding */ fetchAllUsers),\n/* harmony export */   renderUserList: () => (/* binding */ renderUserList),\n/* harmony export */   userList: () => (/* binding */ userList)\n/* harmony export */ });\n/* harmony import */ var _views_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/login */ \"./client-chat/src/views/login.ts\");\n/* harmony import */ var _websocket_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket-client */ \"./client-chat/src/components/websocket-client.ts\");\n\n\nfunction userList() {\n    const userListContainer = document.createElement('div');\n    userListContainer.setAttribute('id', 'user-list');\n    const searchInput = document.createElement('input');\n    searchInput.setAttribute(\"type\", \"text\");\n    searchInput.setAttribute(\"placeholder\", \"Search users...\");\n    const usersList = document.createElement('ul');\n    usersList.setAttribute('id', \"users\");\n    userListContainer.appendChild(searchInput);\n    userListContainer.appendChild(usersList);\n    return userListContainer;\n}\nfunction renderUserList(users) {\n    const currentUserData = sessionStorage.getItem('user');\n    const currentUser = currentUserData ? JSON.parse(currentUserData).login : '';\n    const usersList = document.getElementById(\"users\");\n    if (!usersList)\n        return;\n    usersList.innerHTML = '';\n    users\n        .filter(user => user.login !== currentUser)\n        .forEach(user => {\n        const userItem = document.createElement('li');\n        userItem.textContent = `${user.login}`;\n        usersList.appendChild(userItem);\n    });\n}\nfunction fetchAllUsers() {\n    // const active = await fetchUsers(\"USER_ACTIVE\");\n    // console.log(active);\n    // const inactive = await fetchUsers(\"USER_INACTIVE\");\n    fetchUsers(_websocket_client__WEBPACK_IMPORTED_MODULE_1__.MessageType.active);\n    fetchUsers(_websocket_client__WEBPACK_IMPORTED_MODULE_1__.MessageType.inactive);\n    //return [...active, ...inactive];\n}\nfunction fetchUsers(type) {\n    console.log('fetchUsers');\n    const requestId = Math.random();\n    _views_login__WEBPACK_IMPORTED_MODULE_0__.wsClient.sendRequest({\n        id: requestId + '',\n        type: type,\n        payload: null\n    });\n}\n// function fetchUsers(type: \"USER_ACTIVE\" | \"USER_INACTIVE\"): Promise<User[]> {\n//     console.log('fetchUsers');\n//     return new Promise((resolve) => {\n//         const requestId = Math.random();\n//         wsClient.sendRequest({\n//            id: requestId + '',\n//            type: type,\n//            payload: null\n//         }, resolve);\n//     });\n// }\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/components/user-list.ts?");

/***/ }),

/***/ "./client-chat/src/components/websocket-client.ts":
/*!********************************************************!*\
  !*** ./client-chat/src/components/websocket-client.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MessageType: () => (/* binding */ MessageType),\n/* harmony export */   WebSocketClient: () => (/* binding */ WebSocketClient),\n/* harmony export */   activeArray: () => (/* binding */ activeArray),\n/* harmony export */   inActiveArray: () => (/* binding */ inActiveArray)\n/* harmony export */ });\n/* harmony import */ var _user_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-list */ \"./client-chat/src/components/user-list.ts\");\n\nlet activeArray = [];\nlet inActiveArray = [];\nclass WebSocketClient {\n    constructor() {\n        this.socket = new WebSocket('ws://localhost:4000');\n        this.socket.addEventListener('open', () => {\n            console.log('Websocket connected to the server');\n        });\n        this.socket.addEventListener('message', (event) => {\n            const message = JSON.parse(event.data);\n            console.log(message);\n            this.handleWWSMessage(message);\n        });\n        this.socket.addEventListener('error', (error) => {\n            console.error('WebSocket error:', error);\n        });\n    }\n    sendRequest(data) {\n        const send = () => {\n            this.socket.send(JSON.stringify(data));\n        };\n        if (this.socket.readyState === WebSocket.OPEN) {\n            send();\n        }\n        else {\n            this.socket.addEventListener('open', () => send(), { once: true });\n        }\n    }\n    handleWWSMessage(message) {\n        switch (message.type) {\n            case MessageType.active:\n                activeArray = message.payload.users;\n                (0,_user_list__WEBPACK_IMPORTED_MODULE_0__.renderUserList)(activeArray);\n                break;\n            case MessageType.inactive:\n                inActiveArray = message.payload.users;\n                (0,_user_list__WEBPACK_IMPORTED_MODULE_0__.renderUserList)(inActiveArray);\n                break;\n            default:\n                break;\n        }\n    }\n    close() {\n        this.socket.close();\n    }\n}\nvar MessageType;\n(function (MessageType) {\n    MessageType[\"active\"] = \"USER_ACTIVE\";\n    MessageType[\"inactive\"] = \"USER_INACTIVE\";\n})(MessageType || (MessageType = {}));\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/components/websocket-client.ts?");

/***/ }),

/***/ "./client-chat/src/index.ts":
/*!**********************************!*\
  !*** ./client-chat/src/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router/router */ \"./client-chat/src/router/router.ts\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ \"./client-chat/src/style.css\");\n\n\n(0,_router_router__WEBPACK_IMPORTED_MODULE_0__.initRouter)();\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/index.ts?");

/***/ }),

/***/ "./client-chat/src/router/router.ts":
/*!******************************************!*\
  !*** ./client-chat/src/router/router.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initRouter: () => (/* binding */ initRouter)\n/* harmony export */ });\n/* harmony import */ var _views_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/login */ \"./client-chat/src/views/login.ts\");\n/* harmony import */ var _views_about__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/about */ \"./client-chat/src/views/about.ts\");\n/* harmony import */ var _views_chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/chat */ \"./client-chat/src/views/chat.ts\");\n\n\n\nfunction initRouter() {\n    window.addEventListener('hashchange', handleRouteChange);\n    handleRouteChange();\n    function handleRouteChange() {\n        const route = window.location.hash.slice(1);\n        switch (route) {\n            case 'login':\n                (0,_views_login__WEBPACK_IMPORTED_MODULE_0__.renderLoginPage)();\n                break;\n            case 'about':\n                (0,_views_about__WEBPACK_IMPORTED_MODULE_1__.renderAboutPage)();\n                break;\n            case 'chat':\n                (0,_views_chat__WEBPACK_IMPORTED_MODULE_2__.renderChatPage)();\n                break;\n            default:\n                (0,_views_login__WEBPACK_IMPORTED_MODULE_0__.renderLoginPage)();\n        }\n    }\n}\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/router/router.ts?");

/***/ }),

/***/ "./client-chat/src/style.css":
/*!***********************************!*\
  !*** ./client-chat/src/style.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./client-chat/src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/style.css?");

/***/ }),

/***/ "./client-chat/src/views/about.ts":
/*!****************************************!*\
  !*** ./client-chat/src/views/about.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderAboutPage: () => (/* binding */ renderAboutPage)\n/* harmony export */ });\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat */ \"./client-chat/src/views/chat.ts\");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login */ \"./client-chat/src/views/login.ts\");\n\n\nfunction renderAboutPage() {\n    document.body.innerHTML = \"\";\n    const title = document.createElement(\"h1\");\n    title.textContent = \"About\";\n    const backButton = document.createElement(\"button\");\n    backButton.setAttribute(\"type\", \"button\");\n    backButton.textContent = \"Back\";\n    const aboutContent = document.createElement('p');\n    aboutContent.textContent = \"This is page about this app which was created by Roman Masliak using typescript and Websocket\";\n    document.body.appendChild(title);\n    document.body.appendChild(aboutContent);\n    document.body.appendChild(backButton);\n    backButton.addEventListener(\"click\", () => {\n        if ((0,_login__WEBPACK_IMPORTED_MODULE_1__.isAuthenticated)()) {\n            (0,_chat__WEBPACK_IMPORTED_MODULE_0__.renderChatPage)();\n        }\n        else {\n            (0,_login__WEBPACK_IMPORTED_MODULE_1__.renderLoginPage)();\n        }\n    });\n}\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/views/about.ts?");

/***/ }),

/***/ "./client-chat/src/views/chat.ts":
/*!***************************************!*\
  !*** ./client-chat/src/views/chat.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderChatPage: () => (/* binding */ renderChatPage)\n/* harmony export */ });\n/* harmony import */ var _components_user_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/user-list */ \"./client-chat/src/components/user-list.ts\");\n/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about */ \"./client-chat/src/views/about.ts\");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ \"./client-chat/src/views/login.ts\");\n\n\n\nfunction renderChatPage() {\n    const userData = sessionStorage.getItem('user');\n    const username = userData ? JSON.parse(userData).login : \"Guest\";\n    console.log(userData);\n    document.body.innerHTML = \"\";\n    const title = document.createElement(\"h1\");\n    title.textContent = `Fun chat - ${username}`;\n    const chatContainer = document.createElement(\"div\");\n    chatContainer.setAttribute('id', 'chat');\n    const welcomeMessage = document.createElement('p');\n    welcomeMessage.textContent = `Welcome to the chat, ${username}!`;\n    const logoutBtn = document.createElement(\"button\");\n    logoutBtn.textContent = \"Logout\";\n    const aboutButton = document.createElement(\"button\");\n    aboutButton.setAttribute(\"type\", \"button\");\n    aboutButton.textContent = \"About app\";\n    chatContainer.appendChild(welcomeMessage);\n    title.appendChild(logoutBtn);\n    title.appendChild(aboutButton);\n    document.body.appendChild(title);\n    document.body.append(chatContainer);\n    aboutButton.addEventListener(\"click\", _about__WEBPACK_IMPORTED_MODULE_1__.renderAboutPage);\n    logoutBtn.addEventListener(\"click\", () => {\n        sessionStorage.removeItem('user');\n        _login__WEBPACK_IMPORTED_MODULE_2__.wsClient.close();\n        (0,_login__WEBPACK_IMPORTED_MODULE_2__.renderLoginPage)();\n    });\n    const userListElement = (0,_components_user_list__WEBPACK_IMPORTED_MODULE_0__.userList)();\n    chatContainer.appendChild(userListElement);\n    (0,_components_user_list__WEBPACK_IMPORTED_MODULE_0__.fetchAllUsers)();\n    // .then(users => {\n    //     console.log(users);\n    //     renderUserList(users);\n    // });\n}\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/views/chat.ts?");

/***/ }),

/***/ "./client-chat/src/views/login.ts":
/*!****************************************!*\
  !*** ./client-chat/src/views/login.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isAuthenticated: () => (/* binding */ isAuthenticated),\n/* harmony export */   renderLoginPage: () => (/* binding */ renderLoginPage),\n/* harmony export */   wsClient: () => (/* binding */ wsClient)\n/* harmony export */ });\n/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about */ \"./client-chat/src/views/about.ts\");\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat */ \"./client-chat/src/views/chat.ts\");\n/* harmony import */ var _components_websocket_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/websocket-client */ \"./client-chat/src/components/websocket-client.ts\");\n\n\n\nfunction renderLoginPage() {\n    if (isAuthenticated()) {\n        (0,_chat__WEBPACK_IMPORTED_MODULE_1__.renderChatPage)();\n        return;\n    }\n    // document.body.innerHTML = \"\";\n    const title = document.createElement(\"h1\");\n    title.textContent = \"Login page\";\n    const form = document.createElement(\"form\");\n    const loginLabel = document.createElement(\"label\");\n    loginLabel.setAttribute(\"for\", \"login\");\n    loginLabel.textContent = \"Login\";\n    const loginInput = document.createElement(\"input\");\n    loginInput.setAttribute(\"type\", \"text\");\n    loginInput.setAttribute(\"id\", \"login\");\n    loginInput.setAttribute(\"name\", \"login\");\n    const loginError = document.createElement('div');\n    loginError.style.color = \"red\";\n    const passwordLabel = document.createElement(\"label\");\n    passwordLabel.setAttribute(\"for\", \"password\");\n    passwordLabel.textContent = \"Password\";\n    const passwordInput = document.createElement('input');\n    passwordInput.setAttribute('type', 'password');\n    passwordInput.setAttribute('id', 'password');\n    passwordInput.setAttribute('name', 'password');\n    const passwordError = document.createElement('div');\n    passwordError.style.color = \"red\";\n    const submitButton = document.createElement(\"button\");\n    submitButton.setAttribute(\"type\", \"submit\");\n    submitButton.textContent = \"Login\";\n    const aboutButton = document.createElement(\"button\");\n    aboutButton.setAttribute(\"type\", \"button\");\n    aboutButton.textContent = \"About app\";\n    form.appendChild(loginLabel);\n    form.appendChild(loginInput);\n    form.appendChild(loginError);\n    form.appendChild(passwordLabel);\n    form.appendChild(passwordInput);\n    form.appendChild(passwordError);\n    form.appendChild(submitButton);\n    form.appendChild(aboutButton);\n    document.body.appendChild(title);\n    document.body.appendChild(form);\n    function validateLogin(value) {\n        if (value.length < 4)\n            return \"Login must be at least 4 characters long\";\n        if (!/^[a-zA-Z0-9]+$/.test(value))\n            return \"Login must contain only letters and numbers.\";\n        return null;\n    }\n    function validatePassword(value) {\n        if (value.length < 6)\n            return \"Password must be at least 6 characters long\";\n        if (!/\\d/.test(value) || !/[a-zA-Z]/.test(value))\n            return \"password must include numbers and letters\";\n        return null;\n    }\n    form.addEventListener(\"submit\", async (event) => {\n        event.preventDefault();\n        const login = loginInput.value.trim();\n        const password = passwordInput.value;\n        const loginValidation = validateLogin(login);\n        const passwordValidation = validatePassword(password);\n        loginError.textContent = loginValidation ?? \"\";\n        passwordError.textContent = passwordValidation ?? \"\";\n        if (!loginValidation && !passwordValidation) {\n            try {\n                const success = await authenticateUser(wsClient, login, password);\n                if (success) {\n                    (0,_chat__WEBPACK_IMPORTED_MODULE_1__.renderChatPage)();\n                }\n            }\n            catch {\n                console.log(\"Authentication failed.\");\n            }\n        }\n    });\n    form.addEventListener(\"keydown\", (event) => {\n        if (event.key === \"Enter\") {\n            submitButton.click();\n        }\n    });\n    aboutButton.addEventListener(\"click\", () => {\n        (0,_about__WEBPACK_IMPORTED_MODULE_0__.renderAboutPage)();\n    });\n}\nfunction isAuthenticated() {\n    const userData = sessionStorage.getItem(\"user\");\n    if (!userData)\n        return false;\n    try {\n        const user = JSON.parse(userData);\n        return user.isLogined === true;\n    }\n    catch {\n        return false;\n    }\n}\nconst wsClient = new _components_websocket_client__WEBPACK_IMPORTED_MODULE_2__.WebSocketClient();\nasync function authenticateUser(wsClient, login, password) {\n    return new Promise((resolve, reject) => {\n        const requestId = `${Date.now()}`;\n        const request = {\n            id: requestId,\n            type: \"USER_LOGIN\",\n            payload: {\n                user: {\n                    login,\n                    password,\n                }\n            }\n        };\n        const handleMessage = (event) => {\n            const response = JSON.parse(event.data);\n            if (response.id !== request.id) {\n                return;\n            }\n            if (response.type === \"USER_LOGIN\" && response.payload.user.isLogined) {\n                sessionStorage.setItem('user', JSON.stringify(response.payload.user));\n                resolve(true);\n            }\n            else if (response.type === \"ERROR\") {\n                displayError(response.payload.error);\n                reject(false);\n            }\n            wsClient['socket'].removeEventListener('message', handleMessage);\n        };\n        wsClient['socket'].addEventListener('message', handleMessage);\n        wsClient.sendRequest(request);\n    });\n}\nfunction displayError(message) {\n    let errorElement = document.getElementById('login-error');\n    if (!errorElement) {\n        errorElement = document.createElement('div');\n        errorElement.id = 'login-error';\n        errorElement.style.color = 'red';\n        document.body.appendChild(errorElement);\n    }\n    errorElement.textContent = message;\n}\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/views/login.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./client-chat/src/style.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./client-chat/src/style.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `:root {\r\n    --color-bg: #f1f4f3;\r\n    --color-primary: #4caf50;\r\n    --color-primary-dark: #388e3c;\r\n    --color-accent: #81c784;\r\n    --color-text: #333;\r\n    --color-text-light: #555;\r\n    --color-border: #cfd8dc;\r\n    --color-error: #e57373;\r\n}\r\n\r\nbody {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;\r\n    background-color: var(--color-bg);\r\n    color: var(--color-text);\r\n}\r\n\r\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://fun-chat/./client-chat/src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://fun-chat/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://fun-chat/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://fun-chat/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://fun-chat/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://fun-chat/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://fun-chat/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://fun-chat/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://fun-chat/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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