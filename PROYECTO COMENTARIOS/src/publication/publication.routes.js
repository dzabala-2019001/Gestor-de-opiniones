import { Router } from "express"
import { savePublication, deletePublication, obtener, updatePublication } from "./publication.controller.js"
import {validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()
api.post('/savePublication',[validateJwt], savePublication)
api.put('/updatePublication/:id', [validateJwt], updatePublication)
api.delete('/deletePublication/:id', [validateJwt], deletePublication)
api.get('/obtener', [validateJwt], obtener)

export default api