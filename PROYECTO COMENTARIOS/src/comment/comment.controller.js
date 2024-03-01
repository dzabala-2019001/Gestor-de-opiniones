'use strict'

import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'
import {  checkUpdateComment} from '../utils/validator.js'

export const saveComment = async(req, res) =>{
    try {
        let data = req.body
        data.user = req.user._id
        let publication = Publication.findOne({_id: data.publication})
        if(!publication) return res.status(404).send({message: 'Publication not found'})

        let comment = new Comment(data)
        await comment.save()
        return res.send({message: `Register your comment`})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error registering Comment', error: error})
    }
}

export const updateCommetn = async (req, res) =>{
    try {
        let data = req.body
        let {id} = req.params
        let idUser = req.user._id.toString()

        let findUser = await Comment.findOne({ _id: id })
        if(!findUser) return res.status(404).send({message: 'Comment not found'})
        let idU = findUser.user.toString()

        if (idU == idUser) {
            let updatedComment = await checkUpdateComment (data, id)
            if (!updatedComment) return res.status(400).send({ message: 'Have submitted some data that cannot be update' })
            let updateComment = await Comment.findOneAndUpdate(
                { _id: id },
                data,
                { new: true }
            )
            if (!updateComment) return res.status(401).send({ message: 'Comment not found' })
            return res.send({ message: 'Comment update', updateComment })
        }else{
            return res.status(400).send({message: 'You can not update the Comment of another user'})
        }

    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error update your Comment', error: error})  
    }
}

export const deleteComment = async(req, res)=>{
    try {
        let {id} = req.params
        let uId = req.user._id.toString()

        let findUser = await Comment.findOne({_id: id})
        if(!findUser) return res.status(404).send({message: 'Comment not found'})
        let userID = findUser.user.toString()
        
        if(uId === userID){
            let deleteComment = await Comment.findOneAndDelete({_id: id})
            if(!deleteComment) return res.status(404).send('Comment not found')
            return res.send({message: `Comment deleted successfully `})

        }else{
            return res.status(500).send({message: 'You can not delete the Comment of other user'})
        }
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error delete comment', error: error})  
    }
    
}

export const obtener = async (req, res) =>{
    try {

        let comments = await Comment.find()
        if(!comments) return res.status(404).send({message: 'commentos not found'})
        
        return res.send(comments)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Fail get comments'})
    }
}