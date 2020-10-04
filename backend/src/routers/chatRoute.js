const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/User');
const sortArray = require('sort-array');
const { check, validationResult } = require('express-validator');
const authenticate = require('../middleware/authenticate');

router.get('/chat/:receiver', authenticate, async (req, res) => {
    // const { receiver } = req.query;
    const receiver = req.params.receiver;
    const sender = req.user._id;
    try {
        //get sent messages
        const sentMessages = await Chat.find({
            sender: sender,
            receiver: receiver
        }).sort({ date: 'asc' });

        //get received messages
        const receivedMessages = await Chat.find({
            sender: receiver,
            receiver: sender
        }).sort({ date: 'asc' });

        let allMessages = [...sentMessages, ...receivedMessages];
        let sortedAllMessages = sortArray(allMessages, {
            by: 'date',
            order: 'asc'
        })
        res.status(200).send(sortedAllMessages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//integrate the commented code for total sent and received user lists
router.get('/chatUsers', authenticate, async (req, res) => {
    /*
    const senders = await Chat.find({
        receiver: req.user._id
    }, 'sender');
    const senders = result.map(r => r.sender.toString());
    const totalChatUsers = [...senders, ...receivers];
    const uniqueChatUsers = [...new Set(totalChatUsers)];
    */
    try {
        const result = await Chat.find({
            sender: req.user._id
        }, 'receiver');
        const receivers = result.map(r => r.receiver.toString());


        const sendersMain = await Chat.find({
            receiver: req.user._id
        }, 'sender');
        const senders = sendersMain.map(r => r.sender.toString());
        const totalChatUsers = [...senders, ...receivers];
        const uniqueReceivers = [...new Set(totalChatUsers)];


        // const uniqueReceivers = [...new Set(receivers)];
        let userList = [];
        for (let i = 0; i < uniqueReceivers.length; i++) {
            const chattedUser = await User.findById(uniqueReceivers[i], '-tokens -__v -password');
            userList.push(chattedUser);
        }
        res.status(200).send(userList);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/chat', [
    authenticate,
    check('receiver', 'Receiver cannot be empty').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    let uniqueTime = Date.now();
    let chat = new Chat({
        ...req.body,
        sender: req.user._id,
        date: uniqueTime
    });
    try {
        await chat.save();
        res.status(201).send(chat);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router;