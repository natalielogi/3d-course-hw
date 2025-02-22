export function saveUserData(userData) {
    localStorage.setItem('authToken', userData.token)
    localStorage.setItem('userName', userData.name)
    localStorage.setItem('userId', userData._id)
}

export function checkAuth() {
    return localStorage.getItem('authToken') !== null
}

export function getCurrentUser() {
    const token = localStorage.getItem('authToken')
    const id = localStorage.getItem('userId')
    const name = localStorage.getItem('userName')
    if (!token || !id || !name) {
        return null
    }

    return { id, name, token }
}

export function logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    window.location.reload()
}
