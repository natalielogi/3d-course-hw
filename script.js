const commentsData = [
    {
        id: 1,
        text: "это мой первый комментарий!",
        likes: 3,
        liked: false,
        date: new Date().toLocaleString(),
    },
    {
        id: 2,
        text: "Очень классная работа!",
        likes: 5,
        liked: true,
        date: new Date().toLocaleString(),
    },
];

function renderComments() {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';

    commentsData.forEach((comment) => {
        const likeClass = comment.liked ? 'liked' : '';

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
        <p>${comment.text}</p>
        <small>Добавлено: ${comment.date}</small>
        <div>
            <button class="like-btn ${likeClass}" data-id="${comment.id}">
            <svg width="20.000031" height="18.009094" viewBox="0 0 20 18.0091" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <desc>
                    Created with Pixso.
            </desc>
            <defs/>
            <path id="coolicon" d="M10 18C9.35 17.42 8.62 16.83 7.85 16.2L7.84 16.2C5.13 13.98 2.05 11.46 0.69 8.45C0.24 7.5 0.01 6.45 0 5.4C-0.01 3.95 0.57 2.56 1.61 1.54C2.64 0.52 4.04 -0.03 5.5 0C6.68 0 7.83 0.34 8.82 0.98C9.26 1.26 9.65 1.6 10 2C10.34 1.61 10.73 1.26 11.17 0.98C12.16 0.34 13.31 0 14.5 0C15.95 -0.03 17.35 0.52 18.38 1.54C19.42 2.56 20 3.95 20 5.4C19.98 6.45 19.75 7.5 19.3 8.46C17.94 11.47 14.87 13.98 12.15 16.2L12.14 16.2C11.37 16.83 10.64 17.43 10 18L10 18ZM5.5 2C4.56 1.98 3.67 2.34 3 2.99C2.35 3.62 1.99 4.49 1.99 5.4C2.01 6.17 2.18 6.93 2.51 7.62C3.15 8.92 4.01 10.1 5.06 11.1C6.06 12.1 7.2 13.06 8.18 13.88C8.45 14.1 8.73 14.33 9.01 14.56L9.19 14.7C9.45 14.92 9.73 15.14 10 15.37L10.01 15.35L10.01 15.35L10.02 15.35L10.03 15.34L10.03 15.34L10.04 15.34L10.06 15.33L10.1 15.29L10.1 15.29L10.12 15.28L10.12 15.28L10.13 15.27L10.8 14.73L10.97 14.58C11.25 14.36 11.53 14.13 11.8 13.9C12.79 13.09 13.93 12.12 14.92 11.12C15.97 10.12 16.83 8.94 17.48 7.65C17.81 6.94 17.99 6.17 18 5.4C18 4.49 17.64 3.63 17 3C16.33 2.35 15.43 1.99 14.5 2C13.36 1.99 12.27 2.46 11.51 3.31L10 5.05L8.49 3.31C7.72 2.46 6.63 1.99 5.5 2Z" fill="#C4C4C4" fill-opacity="1.000000" fill-rule="nonzero"/>
        </svg>        
            </button>
            <span class="likes-count">${comment.likes}</span> лайков
        </div>
        `;
        commentsContainer.appendChild(commentDiv);
    });

    addLikeHandlers();
}

function addLikeHandlers() {
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach((button) => {
        button.onclick = () => {
            const commentId = parseInt(button.dataset.id, 10);
            if (isNaN(commentId)) return;

            const comment = commentsData.find((c) => c.id === commentId);
            if (comment) {
                comment.liked = !comment.liked;
                comment.likes += comment.liked ? 1 : -1;
                renderComments();
            }
        };
    });
}

document.getElementById('submit-btn').addEventListener('click', () => {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();

    if (commentText === '') {
        alert('Комментарий не может быть пустым!');
        return;
    }

    const newComment = {
        id: commentsData.length + 1,
        text: commentText,
        likes: 0,
        liked: false,
        date: new Date().toLocaleString(),
    };

    commentsData.push(newComment);
    renderComments();
    commentInput.value = '';
});

renderComments();