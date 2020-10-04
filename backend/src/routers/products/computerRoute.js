const express = require('express');

const Computer = require('../../models/products/Computer');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const User = require('../../models/User');

const adminCheck = require('../../middleware/adminCheck');
const multer = require('multer');
const path = require('path')

var obj = [];

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destFolder = path.join(__dirname, '../../../../client/public/images');
        cb(null, destFolder);
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        let file_name = Date.now() + ext;
        obj.push(file_name);
        cb(null, file_name);
    }

})

var upload = multer({ storage: diskStorage });

router.post('/computer', authenticate, upload.array('images', 3), async (req, res) => {
    const { title, description, price, soldFrom, condition, brand } = req.body;

    const comp = {
        title,
        description,
        price,
        soldFrom,
        condition,
        brand,
        images: obj,
        addedBy: req.user._id
    }

    try {
        if (req.body.price < 1) {
            obj = [];
            return res.status(400).json({ msg: 'Price cannot be 0 or negative' });
        }
        if (!(req.body.condition == "old" || req.body.condition == "new")) {
            obj = [];
            return res.status(400).json({ msg: 'Condition can be either new or old' });
        }
        const computer = new Computer(comp);
        await computer.save();
        obj = [];
        res.status(201).send(computer);
    } catch (err) {
        console.error(err);
        obj = [];
        res.status(500).send('Server Error');
    }
})

//route to post ad for computer
// router.post('/computer', [
//     authenticate,
//     check('title', 'Title of ad is required').not().isEmpty(),
//     check('description', 'Description of ad is required').not().isEmpty(),
//     check('brand', 'Brand of computer or laptop is required').not().isEmpty(),
//     check('price', 'Price of ad is required').not().isEmpty(),
//     check('soldFrom', 'Seller location of ad is required').not().isEmpty(),
//     check('condition', 'Condition of computer or laptop is required').not().isEmpty()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//         return res.status(400).json({ errors: errors.array() });
//     const computer = new Computer({
//         ...req.body,
//         addedBy: req.user._id
//     });
//     try {
//         if (req.body.price < 1)
//             return res.status(400).json({ msg: 'Price cannot be 0 or negative' });
//         if (!(req.body.condition == "old" || req.body.condition == "new"))
//             return res.status(400).json({ msg: 'Condition can be either new or old' });
//         await computer.save();
//         res.status(201).send(computer);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

//route to get all computers
router.get('/computer', async (req, res) => {
    try {
        const computers = await Computer.find({});
        res.status(200).send(computers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


//route to get computers added by oneself
router.get('/profileComputers', authenticate, async (req, res) => {
    try {
        await req.user.populate({
            path: 'computers'
        }).execPopulate();
        res.status(200).send(req.user.computers);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//route to get computers added by any user 
//(takes id as argument)
router.get('/userComputers/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.findById(userId);
        await user.populate({
            path: 'computers'
        }).execPopulate();
        res.status(200).send(user.computers);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


//route to get single computer details
router.get('/oneComputerWithOwner/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Computer.findById(id).populate('addedBy', '-tokens -password -__v');
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.delete('/computer/:id', authenticate, async (req, res) => {
    try {
        const computer = await Computer.findOneAndDelete({
            _id: req.params.id,
            addedBy: req.user._id
        })
        if (!computer)
            return res.status(404).json({ msg: 'You are not authorized to delete items that you have not added' });
        res.status(200).send(computer);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

//route to get one computer details
router.get('/computer/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Computer.findById(id, 'title description price soldFrom brand condition -_id images').lean().exec();
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//route to edit computer details
router.patch('/computer/:id', [
    authenticate,
    check('title', 'Title of ad is required').not().isEmpty(),
    check('description', 'Description of ad is required').not().isEmpty(),
    check('brand', 'Brand of computer or laptop is required').not().isEmpty(),
    check('price', 'Price of ad is required').not().isEmpty(),
    check('soldFrom', 'Seller location of ad is required').not().isEmpty(),
    check('condition', 'Condition of computer or laptop is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const id = req.params.id;
    try {
        let computer = await Computer.findOneAndUpdate({ _id: id, addedBy: req.user._id }, req.body, { new: true });
        if (!computer)
            return res.status(400).json({ msg: 'You are either not authorized or the data does not exist' });
        res.status(200).send(computer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

// @NotUsed
//get user that has added the computer
router.get('/getComputerOwner/:productId', async (req, res) => {
    const id = req.params.productId;
    try {
        const result = await Computer.findById(id).populate('addedBy', '-tokens -password -__v');
        res.status(200).send(result.addedBy);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//toggle archive status
router.patch('/toggleArchiveComputer/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const currArchive = await Computer.findById(id, 'archived');
        const result = await Computer.findByIdAndUpdate(id, { archived: !currArchive.archived }, { new: true });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//route to delete by admin
router.delete('/adminComputer/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Computer.findByIdAndDelete(id);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Failed' });
    }
})

module.exports = router;