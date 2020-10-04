const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authenticate = require('../middleware/authenticate');
const adminCheck = require('../middleware/adminCheck');

const Furniture = require('../models/products/Furniture');
const Computer = require('../models/products/Computer');
const Mobile = require('../models/products/Mobile');
const Vehicle = require('../models/products/Vehicle');
const Chat = require('../models/Chat');
//get all users
router.get('/users', authenticate, async (req, res) => {
    try {
        const { user } = req;
        const users = await User.find({});
        res.send({ users, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

//get profile/logged in user
router.get('/me', authenticate, (req, res) => {
    try {
        let user = req.user.toObject();
        delete user.password;
        res.send(user);
    } catch (error) {
        console.error(error);
    }
})



//register a user
router.post('/users', [
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Firstname is required').not().isEmpty(),
    check('email', 'Email should be valid').isEmail(),
    check('address', 'Address is required').not().isEmpty(),
    check('password', 'Minimum password length is six').isLength({
        min: 6
    }),
    check('phone', 'Phone number length should be 10 digits').isLength({
        min: 10,
        max: 10
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ msg: 'User already registered' });
        user = new User(req.body);
        user.password = await bcrypt.hash(password, 10);

        await user.save();

        const token = user.getToken();
        res.status(201).send({ user, token });            //here user is also sent back. just send res.json({token})
    } catch (error) {
        console.error(error);
        res.status(400).send('Server Error');
    }
});

//edit a user's details
router.patch('/users', [
    authenticate,
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Firstname is required').not().isEmpty(),
    check('email', 'Email should be valid').isEmail(),
    check('address', 'Address is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('phone', 'Phone number length should be 10 digits').isLength({
        min: 10,
        max: 10
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    if (!(req.body.gender.toLowerCase() == 'male' || req.body.gender.toLowerCase() == 'female' || req.body.gender.toLowerCase() == 'others'))
        return res.status(400).json({ msg: ' Gender can be one of three: \'male\', \'female\', \'others\' ' });
    try {
        // let user = await User.findById(req.params.id);
        // if (!user)
        //     return res.status(400).json({ msg: 'No user found' });
        let anotherUserByEmail = await User.findOne({ email: req.body.email });
        if (anotherUserByEmail && (anotherUserByEmail.id !== req.user.id))
            return res.status(400).json({ msg: 'Email already taken by another user' });
        // user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//edit user's password
router.patch('/users/password', [
    authenticate,
    check('password', 'Minimum password length is six').isLength({
        min: 6
    }),
    check('oldPassword', 'Minimum password length is six').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        // let user = await User.findById(req.params.id);
        // if (!user)
        //     return res.status(400).json({ msg: 'No user found' });
        let { password, oldPassword } = req.body;
        const oldPasswordMatch = await bcrypt.compare(oldPassword, req.user.password);
        if (!oldPasswordMatch)
            return res.status(400).json({ msg: 'Old password does not match' });
        // const samePassword = await bcrypt.compare(req.body.password, req.user.password);
        if (oldPassword === password)
            return res.status(400).json({ msg: 'Please choose a new password' });
        password = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(req.user.id, { password }, { new: true });
        res.status(200).json({ msg: 'Password successfully updated' });
        // if (user.password == req.body.password)
        //     return res.status(400).json({ msg: 'Please choose a new password' });
        // user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

//delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user)
            return res.status(400).json({ msg: 'No user found' });
        user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


//logging in a user
router.post('/users/login', [
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email, archived: false });
        if (!user)
            return res.status(404).json({ msg: 'No user found' });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ msg: 'Wrong password' });
        const token = user.getToken();
        return res.send({ user, token });
    } catch (error) {
        console.error(error);
        res.status(400).send('Server Error');
    }
});

//logout user
router.get('/users/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((eachToken) => {
            return eachToken.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})


//get one user
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findById(id);
        user = user.toObject();
        delete user.tokens;
        delete user.__v;
        delete user.password;
        // delete user._id;
        delete user.type;
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


//get all users except admin
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({
            type: 'user',
            // archived: false
        }, '-tokens -password -__v').sort({ 'joinedOn': -1 });
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//route to archive one user
router.patch('/archiveOneUser/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        const currentStatus = user.archived;

        let newUser = await User.findByIdAndUpdate(id, {
            archived: !currentStatus
        }, { new: true });

        const userArchived = { userArchived: !currentStatus };

        await Furniture.updateMany({
            addedBy: id
        }, userArchived);

        await Computer.updateMany({
            addedBy: id
        }, userArchived);

        await Mobile.updateMany({
            addedBy: id
        }, userArchived);

        await Vehicle.updateMany({
            addedBy: id
        }, userArchived);

        res.status(200).send(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'error' });
    }
})

//route to delete one user
router.delete('/user/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        const addedBy = { addedBy: id };
        const FR = await Furniture.deleteMany(addedBy);
        const MR = await Mobile.deleteMany(addedBy);
        const CR = await Computer.deleteMany(addedBy);
        const VR = await Vehicle.deleteMany(addedBy);
        const deletedAdsNo = FR.deletedCount + MR.deletedCount + CR.deletedCount + VR.deletedCount;

        //chat delete code added from here
        await Chat.deleteMany({
            sender: id
        });

        await Chat.deleteMany({
            receiver: id
        })
        //chat delete code up to here

        res.status(200).send({
            user,
            deletedAdsNo
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


//just get user name 
router.get('/userName/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id, '-tokens -password -__v');
        const name = user.firstname + ' ' + user.lastname;
        res.status(200).send(name);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;