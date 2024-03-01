import { Router } from "express"
import { saveComment, deleteComment, obtener, updateCommetn } from './comment.controller.js'
import {validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/saveComment', [validateJwt], saveComment)
api.put('/updateComment/:id', [validateJwt], updateCommetn)
api.delete('/deleteComment/:id',[validateJwt], deleteComment)
api.get('/obtener', [validateJwt],obtener)


export default api	