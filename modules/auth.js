export function saveUserData(userData) {
    localStorage.setItem('authToken', userData.token)
    localStorage.setItem('userName', userData.name)
    localStorage.setItem('userId', userData.id)
}

export function checkAuth() {
    return localStorage.getItem('authToken') !== null
}

export function getCurrentUser() {
    return {
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('userName'),
        token: localStorage.getItem('authToken'),
    }
}

export function logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    window.location.reload()
}
