import { fetchComments } from './modules/api.js'
import { postComment } from './modules/api.js'
import { commentsData } from './modules/commentsData.js'
import { renderComments } from './modules/renderComments.js'
import { sanitizeInput } from './modules/utils.js'

function getCommentsFromApi() {
    return fetchComments().then(
        (fetchedComments) => fetchedComments.comments || [],
    )
}

function loadComments() {
    const loadingMessege = document.getElementById('loading-message')
    loadingMessege.style.display = 'block'

    getCommentsFromApi()
        .then((commentsArray) => {
            commentsData.length = 0

            commentsArray.forEach((comment) => {
                commentsData.push({
                    id: comment.id,
                    text: comment.text,
                    likes: comment.likes,
                    liked: comment.isLiked,
                    date: new Date(comment.date).toLocaleString(),
                    name: comment.author.name,
                })
            })

            renderComments()
        })
        .catch((error) => {
            console.error('Не удалось загрузить комментарии:', error)
            alert('Ошибка загрузки комментариев. Попробуйте обновить страницу.')
        })

        .finally(() => {
            loadingMessege.style.display = 'none'
        })
}

loadComments()

document.getElementById('submit-btn').addEventListener('click', async () => {
    const commentInput = document.getElementById('comment-input')
    const commentText = commentInput.value.trim()
    const nameInput = document.getElementById('name-input')
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
    }
})