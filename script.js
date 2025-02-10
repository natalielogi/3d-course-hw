import { loadComments } from './modules/loadComments.js'
import { handleSubmit } from './modules/handleSubmit.js'
import { handleLike } from './modules/handleLike.js'
import { commentsData } from './modules/commentsData.js'

loadComments()
handleSubmit()
handleLike(commentsData)
