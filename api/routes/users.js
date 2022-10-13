const router = require("express").Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { response } = require("express")

//UPDATE USER
router.put('/:id', async(req,res)=> {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password){
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch(err) {
                return res.status(500).json(err)
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json('Account has been updated')
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You can update only your account')
    }
})

//DELETE USER
router.delete('/:id', async(req,res)=> {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json('Account has been deleted successfully')
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You can delete only your account')
    }
})

//GET A USER
router.get('/', async(req,res)=> {
    const userId = req.query.userId
    const userName = req.query.username

    try {
        const user = userId
        ? await User.findById(userId)
        : await User.findOne({username : userName})

        const {password, updatedAt, isAdmin, ...other} = user._doc
        res.status(200).json(other)
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET FRIENDS
router.get('/friends/:id', async(req,res)=> {
    const userId = req.params.id

    try {
        const user = await User.findById(userId)

        const friends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId)
            })
        )

        let friendList = []
        friends.map((f) => { 
            const { _id, username, profilePicture } = f;
            friendList.push({ _id, username, profilePicture })
        })
        res.status(200).json(friendList)
    } catch(err) {
        res.status(500).json(err)
    }
})

//FOLLOW A USER
router.put('/:id/follow', async(req,res)=> {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.follower.includes(req.body.userId)) {
                await user.updateOne({ 
                    $push: { follower: req.body.userId }
                })
                await currentUser.updateOne({ 
                    $push: { following: req.params.id }
                })
                res.status(200).json('User has been successfully followed!')
            } else {
                res.status(403).json('You already follow this user')
            }
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not follow yourself')
    }
})

//UNFOLLOW A USER
router.put('/:id/unfollow', async(req,res)=> {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.follower.includes(req.body.userId)) {
                await user.updateOne({ 
                    $pull: { follower: req.body.userId }
                })
                await currentUser.updateOne({ 
                    $pull: { following: req.params.id }
                })
                res.status(200).json('User has been successfully unfollowed!')
            } else {
                res.status(403).json('You already unfollow this user')
            }
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can not unfollow yourself')
    }
})

//GET ALL USER
router.get('/all', async(req,res)=> {
    try {
        const user = await User.find()

        user.map((u)=> {
            const {password, updatedAt, isAdmin, ...other} = u._doc
            return other
        })
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router