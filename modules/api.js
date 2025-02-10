const COMMENTS_API =
    'https://wedev-api.sky.pro/api/v1/natalia-loginova/comments'
const AUTH_API = 'https://wedev-api.sky.pro/api/user'

export async function fetchComments() {
    try {
        const response = await fetch(COMMENTS_API, {
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

export async function postComment(comment, token) {
    const response = await fetch(COMMENTS_API, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export async function loginUser(login, password) {
    const response = await fetch(`${AUTH_API}/login`, {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Ошибка: ${response.statusText}`)
    }

    return response.json()
}

export async function registerUser(login, name, password) {
    const response = await fetch(AUTH_API, {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            name: name,
            password: password,
        }),
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Ошибка: ${response.statusText}`)
    }

    return response.json()
}
