'use strict'
import {Router} from 'express'
import { obtener, login, register, updateUser } from './user.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()
api.post('/register', register)
api.post('/login', login)
api.put('/updateUser',[validateJwt], updateUser)
api.get('/obtener', [validateJwt], obtener)

export default api
