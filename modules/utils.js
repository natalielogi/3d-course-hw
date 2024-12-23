export function sanitizeInput(input) {
    const escapedInput = input.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

    return escapedInput.replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>')
}
