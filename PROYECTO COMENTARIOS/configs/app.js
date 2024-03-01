
//importaciones
import express from 'express'
import { config } from "dotenv"
import user from '../src/user/user.routes.js'
import category from '../src/category/category.routes.js'
import publication from '../src/publication/publication.routes.js'
import comment from '../src/comment/comment.routes.js'

//Configuracion
const app = express()
config()
const port = process.env.PORT || 2627


//configuracion del server
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//No olvidar Declaración de rutas xd
app.use('/user',user)
app.use('/category', category)
app.use('/publication', publication)
app.use('/comment', comment)


//Levanta el server
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
