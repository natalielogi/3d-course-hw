const commentsData = [
    {
        id: 1,
        text: 'это мой первый комментарий!',
        likes: 3,
        liked: false,
        date: new Date().toLocaleString(),
    },
    {
        id: 2,
        text: 'Очень классная работа!',
        likes: 5,
        liked: true,
        date: new Date().toLocaleString(),
    },
]

function renderComments() {
    const commentsContainer = document.getElementById('comments-container')
    commentsContainer.innerHTML = ''

    commentsData.forEach((comment) => {
        const likeClass = comment.liked ? 'liked' : ''

        const commentDiv = document.createElement('div')
        commentDiv.classList.add('comment')

        const commentText = document.createElement('p')
        commentText.classList.add('comment-text')
        commentText.innerHTML = comment.text
        commentDiv.appendChild(commentText)

        const commentDate = document.createElement('small')
        commentDate.textContent = `Добавлено: ${comment.date}`
        commentDiv.appendChild(commentDate)

        const actionDiv = document.createElement('div')
        actionDiv.classList.add('comment-action')
        actionDiv.innerHTML = `
        <button class="like-btn ${likeClass}" data-id="${comment.id}">
          <svg width="20.000031" height="18.009094" viewBox="0 0 20 18.0091" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C9.35 17.42 8.62 16.83 7.85 16.2C5.13 13.98 2.05 11.46 0.69 8.45C0.24 7.5 0.01 6.45 0 5.4C-0.01 3.95 0.57 2.56 1.61 1.54C2.64 0.52 4.04 -0.03 5.5 0C6.68 0 7.83 0.34 8.82 0.98C9.26 1.26 9.65 1.6 10 2C10.34 1.61 10.73 1.26 11.17 0.98C12.16 0.34 13.31 0 14.5 0C15.95 -0.03 17.35 0.52 18.38 1.54C19.42 2.56 20 3.95 20 5.4C19.98 6.45 19.75 7.5 19.3 8.46C17.94 11.47 14.87 13.98 12.15 16.2C11.37 16.83 10.64 17.43 10 18Z" fill="#C4C4C4"/>
          </svg> 
        </button>
        <span class="likes-count">${comment.likes}</span> лайков
        <button class="reply-btn" data-id="${comment.id}">Ответить</button>
      `
        commentDiv.appendChild(actionDiv)

        commentsContainer.appendChild(commentDiv)
    })

    addLikeHandlers()
}

function addLikeHandlers() {
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

function sanitizeInput(input) {
    const escapedInput = input.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

    return escapedInput.replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>')
}

renderComments()
