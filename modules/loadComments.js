import { getCommentsFromApi } from './getCommentsFromApi.js'
import { commentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'

export function loadComments() {
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
