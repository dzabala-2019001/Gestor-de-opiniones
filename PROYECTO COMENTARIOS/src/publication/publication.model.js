'use strict'
import { Schema, model } from "mongoose"

const publicationSchema = Schema({
    title: {
        type: String, 
        required: true
    }, 
    content: {
        type: String, 
        required: true
    }, 
    fecha:{
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    }

},{
    versionKey: false 
})

export default model('publication', publicationSchema)