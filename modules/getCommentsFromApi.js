import { fetchComments } from './api.js'

export function getCommentsFromApi() {
    return fetchComments().then(
        (fetchedComments) => fetchedComments.comments || [],
    )
}
