export function loadUsers() {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json
            } else {
                throw new Error('Ошибка при загрузке пользователей')
            }
        })
        .then((data) => {
            return data.users
        })
        .catch((error) => {
            console.log('Ошибка:', error)
            return []
        })
}
