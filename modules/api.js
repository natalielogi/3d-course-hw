const API = 'https://wedev-api.sky.pro/api/v1/natalia-loginova/comments'

export async function fetchComments() {
    try {
        const response = await fetch(API, {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Ошибка при запросе данных:', error)
        throw error
    }
}

export async function postComment(comment) {
    const response = await fetch(API, {
        method: 'POST',
        body: JSON.stringify({
            text: comment.text,
            name: comment.name,
        }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Ошибка: ${response.statusText}`)
    }

    return response.json()
}
