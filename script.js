import { loadComments } from './modules/loadComments.js'
// import { handleLike } from './modules/handleLike.js'
import { addLikeHandlers } from './modules/eventHandlers.js'
import { checkAuth, logout, getCurrentUser } from './modules/auth.js'
import { handleLogin } from './modules/login.js'
import { handleRegister } from './modules/registr.js'
import { loadUsers } from './modules/users.js'
import { handleSubmit, setCurrentUserName } from './modules/handleSubmit.js'
import { addReplyHandlers } from './modules/eventHandlers.js'

document.addEventListener('DOMContentLoaded', () => {
    if (checkAuth()) {
        document.getElementById('auth-buttons').style.display = 'none'
        document.getElementById('user-profile').style.display = 'block'
        document.getElementById('username').textContent = getCurrentUser().name
    } else {
        document.getElementById('auth-buttons').style.display = 'block'
        document.getElementById('user-profile').style.display = 'none'
    }

    loadUsers().then((users) => {
        console.log('Список пользователей:', users)
    })
})

document.getElementById('login-button').addEventListener('click', handleLogin)
document
    .getElementById('register-button')
    .addEventListener('click', handleRegister)
document.getElementById('logout-button').addEventListener('click', logout)
document.getElementById('submit-btn').addEventListener('click', handleSubmit)
loadComments()
addLikeHandlers()
addReplyHandlers()
setCurrentUserName()
