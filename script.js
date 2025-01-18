import { fetchComments } from './modules/api.js'
import { postComment } from './modules/api.js'
import { commentsData } from './modules/commentsData.js'
import { renderComments } from './modules/renderComments.js'
import { sanitizeInput } from './modules/utils.js'

async function loadComments() {
    try {
        const fetchedComments = await fetchComments()
        const commentsArray = fetchedComments.data || []
        commentsData.push(...commentsArray)
        renderComments()
    } catch (error) {
        console.error('Не удалось загрузить комментарии:', error)
    }
}

loadComments()

document.getElementById('submit-btn').addEventListener('click', async () => {
    const commentInput = document.getElementById('comment-input')
    const commentText = commentInput.value.trim()

    if (commentText === '') {
        alert('Комментарий не может быть пустым!')
        return
    }

    const sanitizedText = sanitizeInput(commentText)

    const newComment = {
        text: sanitizedText,
        name: 'Наталья Логинова',
    }

    try {
        const addedComment = await postComment(newComment)

        const commentWithExtras = {
            ...addedComment,
            id: addedComment.id,
            likes: 0,
            liked: false,
            date: new Date().toISOString(),
        }

        commentsData.push(commentWithExtras)

        renderComments()
        commentInput.value = ''
    } catch (error) {
        alert('Не удалось отправить комментарий. Попробуйте снова.')
    }
})
