const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/post');
const User = require('../models/users')

// Create a post
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, description } = req.body;

    try {
        const newPost = new Post({
            title,
            description,
            author_id: req.user.id,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// Get all posts by the authenticated user
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { author_id: req.user.id } });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// Get a specific post
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.id, author_id: req.user.id } });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// Update a post
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;
    try {
        let post = await Post.findOne({ where: { id, author_id: req.user.id } });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        post.title = title || post.title;
        post.description = description || post.description;

        post = await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// Delete a post
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOne({ where: { id, author_id: req.user.id } });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        await post.destroy();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});


module.exports = router;
