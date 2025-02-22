import { getCurrentUser } from './auth.js'
import { commentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'
import { toggleLike } from './api.js'

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
                const result = await toggleLike({
                    commentId,
                    token: user.token,
                })
                comment.liked = result.result.isliked
                comment.likes = result.result.likes
            } catch (error) {
                console.error('Ошибка обработки лайка:', error)
                alert('Не удалось поставить лайк. Попробуйте снова.')
            } finally {
                comment.isLikeLoading = false
                renderComments()
            }
        }
    })

    const replyButtons = document.querySelectorAll('.reply-btn')
    replyButtons.forEach((button) => {
        button.onclick = () => {
            const commentId = parseInt(button.dataset.id, 10)
            const comment = commentsData.find((c) => c.id === commentId)

            if (comment) {
                const commentInput = document.getElementById('comment-input')
                commentInput.value = `> ${comment.text}\n`
                commentInput.focus()
            }
        }
    })
}
