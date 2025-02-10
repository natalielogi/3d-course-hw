import { postComment } from './api.js'
import { commentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'
import { sanitizeInput } from './utils.js'
import { getCurrentUser } from './auth.js'

export function handleSubmit() {
    const submitButton = document.getElementById('submit-btn')
    const commentInput = document.getElementById('comment-input')
    const nameInput = document.getElementById('name-input')

    document
        .getElementById('submit-btn')
        .addEventListener('click', async () => {
            const user = getCurrentUser()
            if (!user.token) {
                alert('Для отправки комментария войдите в систему.')
                return
            }

            const commentText = commentInput.value.trim()
            const commentName = nameInput.value.trim() || 'Аноним'

            if (commentText === '') {
                alert('Комментарий не может быть пустым!')
                return
            }

            if (commentText.length < 3) {
                alert('Комментарий должен быть не менее 3 символов!')
                return
            }

            if (commentName.length < 3) {
                alert('Имя должно быть не менее 3 символов!')
                return
            }

            const sanitizedText = sanitizeInput(commentText)

            console.log(commentText, commentName)

            const newComment = {
                text: sanitizedText,
                name: commentName,
            }

            try {
                submitButton.disabled = true
                submitButton.textContent = 'Комментарий загружается...'

                await postComment(newComment, user.token)

                const commentWithExtras = {
                    text: newComment.text,
                    name: newComment.name,
                    likes: 0,
                    liked: false,
                    date: new Date().toISOString(),
                }

                commentsData.push(commentWithExtras)

                renderComments()
                commentInput.value = ''
                nameInput.value = ''
            } catch (error) {
                let errorMessage =
                    'Не удалось отправить комментарий. Попробуйте снова.'
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
        })
}
