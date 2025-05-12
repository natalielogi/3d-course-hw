import { saveUserData } from './auth.js'
import { loginUser } from './api.js'

export function handleLogin() {
    const login = prompt('Введите логин')
    const password = prompt('Введите пароль')

    if (!login || !password) {
        alert('Логин и пароль обязательны!')
        return
    }

    loginUser(login, password)
        .then((data) => {
            saveUserData(data.user)
            alert('Вход выполнен успешно')
            window.location.reload()
        })
        .catch((error) => {
            alert(error.message)
            console.log('Ошибка:', error)
        })
}
