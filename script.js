import { commentsData } from './modules/commentsData.js'
import { renderComments } from './modules/renderComments.js'
import { sanitizeInput } from './modules/utils.js'

document.getElementById('submit-btn').addEventListener('click', () => {
    const commentInput = document.getElementById('comment-input')
    const commentText = commentInput.value.trim()

    if (commentText === '') {
        alert('Комментарий не может быть пустым!')
        return
    }

    const sanitizedText = sanitizeInput(commentText)

    const newComment = {
        id: commentsData.length + 1,
        text: sanitizedText,
        likes: 0,
        liked: false,
        date: new Date().toLocaleString(),
    }

    commentsData.push(newComment)
    renderComments()
    commentInput.value = ''
})

renderComments()
