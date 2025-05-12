import { getCurrentUser } from './auth.js'
import { commentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'
import { loadComments } from './loadComments.js'
import { deleteComment } from './api.js'

export function addLikeHandlers() {
    const likeButtons = document.querySelectorAll('.like-btn')

    likeButtons.forEach((button) => {
        button.onclick = async (event) => {
            event.stopPropagation()

            const user = getCurrentUser()
            if (!user || !user.token) {
                alert('Вы должны войти в систему, чтобы поставить лайк.')
                return
            }

            const commentId = parseInt(button.dataset.id, 10)
            if (isNaN(commentId)) return

            const comment = commentsData.find((c) => c.id === commentId)
            if (!comment || comment.isLikeLoading) return

            comment.isLikeLoading = true
            renderComments()

            try {
                comment.liked = !comment.liked
                comment.likes = +comment.liked ? 1 : 0
            } catch (error) {
                console.error('Ошибка обработки лайка:', error)
                alert('Не удалось поставить лайк. Попробуйте снова.')
            } finally {
                comment.isLikeLoading = false
                renderComments()
            }
        }
    })
}

export function addReplyHandlers() {
    const replyButtons = document.querySelectorAll('.reply-btn')

    replyButtons.forEach((button) => {
        button.onclick = () => {
            const commentId = parseInt(button.dataset.id, 10)
            const comment = commentsData.find((c) => c.id === commentId)

            if (comment) {
                const commentInput = document.getElementById('comment-input')
                // Добавляем текст с символом > (без экранирования)
                commentInput.value = `> ${comment.text}\n`
                commentInput.focus()
            }
        }
    })
}

export function addDeleteHandlers() {
    const deleteButtons = document.querySelectorAll('.delete-btn')

    deleteButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const commentId = button.dataset.id
            const user = getCurrentUser()

            if (!user || !user.token) {
                alert('Для удаления комментария войдите в систему.')
                return
            }

            if (confirm('Вы уверены, что хотите удалить этот комментарий?')) {
                try {
                    await deleteComment(commentId, user.token)
                    await loadComments() // Перезагружаем комментарии после удаления
                } catch (error) {
                    alert('Не удалось удалить комментарий. Попробуйте снова.')
                    console.error('Ошибка удаления комментария:', error)
                }
            }
        })
    })
}
