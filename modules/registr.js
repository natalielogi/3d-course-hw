import { saveUserData } from './auth.js'
import { registerUser } from './api.js'

export function handleRegister() {
    const login = prompt('Введите логин:')
    const name = prompt('Введите ваше имя:')
    const password = prompt('Введите пароль:')

    if (!login || !name || ![password]) {
        alert('Все поля обязательны для заполнения!')
        return
    }

    registerUser(login, name, password)
        .then((data) => {
            saveUserData(data.user)
            alert('Регистрация прошла успешно! Войдите.')
            window.location.reload()
        })
        .catch((error) => {
            alert(error.message)
            console.log('Ошибка:', error)
        })
}
