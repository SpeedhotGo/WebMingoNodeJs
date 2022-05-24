const router = require("express").Router();
const User = require("../models/User");
const {
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin
} = require("./verifyToken");

//UPDATE
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = Cryptojs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }
    try {
        const updateduser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(updateduser);
    } catch (err) {
        res.send({
            'code': 400,
            'status': 'error',
            'result': err.message
        });
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.send({
            'code': 400,
            'status': 'error',
            'result': err.message
        });
    }
});

//Get User
router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {
            password,
            ...others
        } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.send({
            'code': 400,
            'status': 'error',
            'result': err.message
        });
    }
});

//GET ALL USER
router.get("/", verifyTokenAndAuth, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.send({
            'code': 400,
            'status': 'error',
            'result': err.message
        });
    }
});




module.exports = router;