const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { check, validationResult } = require('express-validator');
const adminCheck = require('../middleware/adminCheck');
const nodemailer = require('nodemailer');

router.post('/feedbacks', [
    check('firstname', 'Firstname cannot be empty').not().isEmpty(),
    check('message', 'Message cannot be empty ').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    let feedback = new Feedback(req.body);
    try {
        await feedback.save();
        res.status(201).send(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/allFeedbacks', async (req, res) => {
    try {
        const result = await Feedback.find({});
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
})

router.patch(('/setReviewed/:id'), adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Feedback.findByIdAndUpdate(id, { reviewed: true }, { new: true });
        if (!result)
            return res.status(400).json({ msg: "Error" });
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
})

router.delete('/feedback/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Feedback.findByIdAndDelete(id);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
    }
})

//route to send email
router.post('/email', [
    adminCheck,
    check('firstname', 'Firstname cannot be empty').not().isEmpty(),
    check('message', 'Message cannot be empty ').not().isEmpty(),
    check('lastname', 'Lastname may be empty but should be added as a key').not().isEmpty(),
    check('email', 'Lastname may be empty but should be added as a key').isEmail(),
    check('dateReceived', 'Date received is required').not().isEmpty(),
    check('dateReplied', 'Date replied is required').not().isEmpty(),
    check('reply', 'Reply is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { firstname, lastname, email, dateReceived, dateReplied, message, reply } = req.body;
    const output = `<body>
    <p>Dear ${firstname} ${lastname},</p><br/>
    <p>Your feedback to our site was aptly received. Thank you for contacting our site and giving us opportunity to better our services. We hope to keep providing you with excellent sales service!</p></body>
    <p>Your feedback <b>sent</b> on ${dateReceived}:<p>
    <p><i>${message}</i></p>
    <p>to which the team <b>replies</b> on ${dateReplied}:<p>
    <p>${reply}</p><br/>
    <p>Regards,</p>
    <p>N-Trade</p>
    <p style="text-align: center">Please do not reply to this email as the replies are sent to unmonitored mailbox.</p>
    </body>`;
    try {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '', //please use your gmail account with access to less secured apps turned on 
                pass: ''
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"N-Trade" <online.trade@gmail.com>`, // sender address
            to: email, // list of receivers
            subject: "Reply to Feedback", // Subject line
            text: "Hello world",
            html: output // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ msg: 'Email sent successfully!', type: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Failed to send email', type: 'danger' });
    }
})

//get latest unreplied feedback
router.get('/lastFeedback', async (req, res) => {
    try {
        const result = await Feedback.findOne({ reviewed: false }).sort({ 'datePosted': -1 });
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
})

router.get('/allFeedbacksNumber', async (req, res) => {
    try {
        const result = await Feedback.countDocuments();
        res.status(200).send(result.toString());
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
})


module.exports = router;