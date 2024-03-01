'use strict'

import Publication from './publication.model.js'
import Category from '../category/category.model.js'
import {checkUpdatePublication} from '../utils/validator.js'

export const savePublication = async(req, res)=>{
    try {
        let data = req.body
        data.user = req.user._id
        console.log(data._id)
        let category = Category.findOne({_id: data.category})
        if(!category) return res.status(404).send({message: 'Category not found'})
        let publication = new Publication(data)
        await publication.save()
        return res.send({message: `Register succesfully, ${publication.title}`})

    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Fail to add publication' })
    }

}

export const updatePublication = async (req, res)=>{
    try {
        let data = req.body
        let {id} = req.params
        let idUser = req.user._id.toString()
        console.log(idUser)

        let findUser = await Publication.findOne({ _id: id })
        if(!findUser) return res.status(404).send({message: 'publication not found'})
        let idU = findUser.user.toString()

        if (idU == idUser) {
            let updatedPublication = await checkUpdatePublication(data, id)
            if (!updatedPublication) return res.status(400).send({ message: 'Have submitted some data that cannot be update' })
            let updatePublication = await Publication.findOneAndUpdate(
                { _id: id },
                data,
                { new: true }
            )
            if (!updatePublication) return res.status(401).send({ message: 'Publication not found' })
            return res.send({ message: 'Publication update', updatePublication })
        }else{
            return res.status(400).send({message: 'You can not update the publication of another user'})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Fail to update Publication ' })
    }
}

export const deletePublication = async (req, res) =>{
    try {
        let {id} = req.params
        let uId = req.user._id.toString()

        let findUser = await Publication.findOne({_id: id})
        if(!findUser) return res.status(404).send({message: 'publication not found'})
        let userID = findUser.user.toString()

        if(uId === userID){
            let deletePublication = await Publication.findOneAndDelete({_id: id})
            if(!deletePublication) return res.status(404).send('Publication not found')
            return res.send({message: `Publication ${deletePublication.title} deleted successfully `})

        }else{
            return res.status(500).send({message: 'You can not delete the publication of other user'})
        }
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Fail delete Publication'})
    }
}

export const obtener = async (req, res) =>{
    try {

        let publication = await Publication.find()
        if(!publication) return res.status(404).send({message: 'publication not found'})
        return res.send(publication)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Fail get publication'})
    }
}