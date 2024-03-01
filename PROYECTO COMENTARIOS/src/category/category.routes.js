'use strict'

import {Router} from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { saveCategory, deleteCategory, obtener, updatedCategory } from './category.controller.js'

const api = Router()
api.post('/saveCategory',[validateJwt] ,saveCategory)
api.put('/updateCategory/:id',[validateJwt], updatedCategory)
api.delete('/deleteCategory/:id', [validateJwt], deleteCategory)
api.get('/obtener',[validateJwt], obtener)

export default api