const router = require("express").Router();
const Post = require("../models/Post");
const { verifyToken} = require("./verifyToken");

//CREATE

router.post("/userpost", verifyToken, async (req, res) => {
    console.log("userpostuserpost>>>>>>>>",req.body);
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.send({
            'code': 400,
            'status': 'error',
            'result': err.message
        });
    }
})

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
    console.log(req.body);
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) { 
        res.send({
            'code': 400,
            'status': 'error',
            'result': err.message
        });
    }
})

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.send({
            'code': 400,
            'status': 'error',
            'result': err.message
        });
    }
});



//GET ALL POSTS

router.get("/getpostdata", verifyToken, async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.send({
            'code': 400,
            'status': 'error',
            'result': err.message
        });
    }
});

module.exports = router;