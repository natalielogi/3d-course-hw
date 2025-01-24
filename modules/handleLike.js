import { delay } from './utils.js'
import { renderComments } from './renderComments.js'

export function handleLike(commentsData) {
    const commentsContainer = document.getElementById('comments-container')

    commentsContainer.addEventListener('click', async (event) => {
        const likeButton = event.target.closest('.like-btn')
        if (!likeButton) return

        const commentId = likeButton.dataset.id
        const comment = commentsData.find((c) => c.id === commentId)

        if (!comment || comment.isLikeLoading) return

        comment.isLikeLoading = true
        renderComments()

        likeButton.classList.add('-loading-like')

        try {
            await delay(2000)
            comment.likes = comment.liked
                ? comment.likes - 1
                : comment.likes + 1
            comment.liked = !comment.liked
        } catch (error) {
            console.error('Ошибка обработки лайка:', error)
            alert('Не удалось поставить лайк. Попробуйте снова.')
        } finally {
            comment.isLikeLoading = false
            likeButton.classList.remove('-loading-like')
            renderComments()
        }
    })
}
