export function sanitizeInput(input) {
    const escapedInput = input.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

    return escapedInput.replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>')
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}
