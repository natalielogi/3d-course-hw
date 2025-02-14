import { toggleLike } from './api.js'
import { renderComments } from './renderComments.js'
import { getCurrentUser } from './auth.js'

export function handleLike(commentsData) {
    const commentsContainer = document.getElementById('comments-container')

    commentsContainer.addEventListener('click', async (event) => {
        const likeButton = event.target.closest('.like-btn')
        if (!likeButton) return

        const commentId = likeButton.dataset.id
        const comment = commentsData.find((c) => c.id === commentId)

        if (!comment || comment.isLikeLoading) return

        const user = getCurrentUser()
        if (!user.token) {
            alert('Для лайка комментария войдите в систему.')
            return
        }

        comment.isLikeLoading = true
        renderComments()

        try {
            const result = await toggleLike(commentId, user.token)

            comment.likes = result.result.likes
            comment.liked = result.result.isliked
        } catch (error) {
            console.error('Ошибка обработки лайка:', error)
            alert('Не удалось поставить лайк. Попробуйте снова.')
        } finally {
            comment.isLikeLoading = false
            renderComments()
        }
    })
}
