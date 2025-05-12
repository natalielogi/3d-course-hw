export function sanitizeInput(input) {
    // Экранируем только < и >
    return input.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function formatCommentText(text) {
    return text.replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>')
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}
