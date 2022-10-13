const router = require('express').Router()
const { response } = require('express')
const Post = require('../models/Post')
const User = require('../models/User')

//CREATE POST
router.post('/', async(req,res)=> {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost) 
    } catch(err) {
        res.status(500).json(err)
    }
})

//UPDATE POST
router.put('/:id', async(req,res)=> {
    const post = await Post.findById(req.params.id)

    if (req.body.userId === post.userId) {
        try {
            await post.updateOne({$set: req.body})
            res.status(200).json('This post has been updated')
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You can update only your post')
    }
})

//DELETE POST
router.delete('/:id', async(req,res)=> {
    const post = await Post.findById(req.params.id)

    if (req.body.userId === post.userId) {
        try {
            await post.deleteOne()
            res.status(200).json('This post has been deleted')
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You can delete only your post')
    }
})

//LIKE A POST
router.put('/:id/like', async(req,res)=> {
    const post = await Post.findById(req.params.id)

    try {
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ 
                $push: { likes: req.body.userId }
            })
            res.status(200).json('Post has been successfully liked!')
        } else {
            await post.updateOne({ 
                $pull: { likes: req.body.userId }
            })
            res.status(200).json('Post has been successfully unliked!')
        }
    } catch(err) {
        res.status(500).json('Please check your post id')
    }
})

//GET A POST
router.get('/:id', async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET TIMELINE ALL FOLLOWING POST
router.get('/timeline/:userId', async(req,res)=> {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({ userId: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId=>{
                return Post.find({ userId:friendId })
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET USER'S POSTS
router.get('/profile/:username', async(req,res)=> {
    try {
        const currentUser = await User.findOne({ username: req.params.username })
        const userPosts = await Post.find({ userId: currentUser._id })
        res.status(200).json(userPosts)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router