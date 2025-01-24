import { postComment } from './api.js'
import { commentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'
import { sanitizeInput } from './utils.js'

export function handleSubmit() {
    const submitButton = document.getElementById('submit-btn')
    const commentInput = document.getElementById('comment-input')
    const nameInput = document.getElementById('name-input')

    document
        .getElementById('submit-btn')
        .addEventListener('click', async () => {
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

            const sanitizedText = sanitizeInput(commentText)

            console.log(commentText, commentName)

            const newComment = {
                text: sanitizedText,
                name: commentName,
            }

            try {
                submitButton.disabled = true
                submitButton.textContent = 'Комментарий загружается...'

                await postComment(newComment)

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
            } catch (error) {
                alert('Не удалось отправить комментарий. Попробуйте снова.')
            } finally {
                submitButton.disabled = false
                submitButton.textContent = 'Отправить'
            }
        })
}
