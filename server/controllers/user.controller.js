import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) =>{
    const user = new User(req.body)
    user.save((err, result)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message : "Successfully signed up!"
        })
    })
}

const list = (req, res, next)=>{
    User.find((err, users)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler.getErrorMessage(err)
            })
        }
        res.json(users)
    }).select('name email updated created')
}

const userByID = (req, res, next, id)=>{
    User.findById(id).lean().exec((err, user)=>{
        if(err){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    })
}
const read = (req, res, next)=>{
    console.log("THe request was to read", req.profile);
    // req.profile.hashed_password =undefined
    // request.profile.salt = undefined
    console.log("THe request was to read the profile", req.profile);

    return res.json(req.profile)
}

const update = (req, res, next)=>{
    let user = req.profile
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    })
}

const remove = (req, res, next) =>{
    user.remove((err, deletedUser)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    })
}

export default {create, userByID, list, read, update, remove}