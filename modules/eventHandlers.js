import { commentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'

export function addLikeHandlers() {
    const likeButtons = document.querySelectorAll('.like-btn')

    likeButtons.forEach((button) => {
        button.onclick = (event) => {
            event.stopPropagation()
            const commentId = parseInt(button.dataset.id, 10)
            if (isNaN(commentId)) return

            const comment = commentsData.find((c) => c.id === commentId)
            if (comment) {
                comment.liked = !comment.liked
                comment.likes += comment.liked ? 1 : -1
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
