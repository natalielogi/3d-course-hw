import { postComment } from './api.js'
import { sanitizeInput } from './utils.js'
import { getCurrentUser } from './auth.js'
import { loadComments } from './loadComments.js'

export function setCurrentUserName() {
    const nameInput = document.getElementById('name-input')
    const user = getCurrentUser()
    nameInput.value = user.name
    nameInput.setAttribute('readonly', true)
}

export async function handleSubmit() {
    const submitButton = document.getElementById('submit-btn')
    const commentInput = document.getElementById('comment-input')

    const user = getCurrentUser()
    console.log('Текущий пользователь:', user)

    if (!user || !user.token) {
        alert('Для отправки комментария войдите в систему.')
        return
    }

    const commentText = commentInput.value.trim()

    if (commentText === '') {
        alert('Комментарий не может быть пустым!')
        return
    }

    if (commentText.length < 3) {
        alert('Комментарий должен быть не менее 3 символов!')
        return
    }

    const sanitizedText = sanitizeInput(commentText)

    try {
        submitButton.disabled = true
        submitButton.textContent = 'Комментарий загружается...'

        await postComment({
            text: sanitizedText,
            name: user.name,
            token: user.token,
        })

        commentInput.value = ''
        await loadComments()
    } catch (error) {
        let errorMessage = 'Не удалось отправить комментарий. Попробуйте снова.'
        if (error.message.includes('Failed to fetch')) {
            errorMessage =
                'Проблема с подключением к интернету. Проверьте соединение.'
        } else if (error.message === '400') {
            errorMessage = 'Ошибка: Некорректные данные'
        } else if (error.message === '500') {
            errorMessage = 'Ошибка на сервере. Попробуйте снова позже.'
        }
        alert(errorMessage)
    } finally {
        submitButton.disabled = false
        submitButton.textContent = 'Отправить'
    }
}
