const express = require('express');

const Mobile = require('../../models/products/Mobile');
const { check, validationResult } = require('express-validator');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();
const User = require('../../models/User');

const adminCheck = require('../../middleware/adminCheck');
const multer = require('multer');

const path = require('path');
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


router.post('/mobile', authenticate, upload.array('images', 3), async (req, res) => {
    const { title, description, price, soldFrom, condition, brand } = req.body;

    const mob = {
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
        const mobile = new Mobile(mob);
        await mobile.save();
        obj = [];
        res.status(201).send(mobile);
    } catch (error) {
        console.error(error);
        obj = [];
        res.status(500).send('Server Error');
    }

});


// router.post('/mobile', [
//     authenticate,
//     check('title', 'Title of ad is required').not().isEmpty(),
//     check('description', 'Description of ad is required').not().isEmpty(),
//     check('brand', 'Brand of mobile phone is required').not().isEmpty(),
//     check('price', 'Price of ad is required').not().isEmpty(),
//     check('soldFrom', 'Seller location of ad is required').not().isEmpty(),
//     check('condition', 'Condition of mobile is required').not().isEmpty()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//         return res.status(400).json({ errors: errors.array() });
//     const mobile = new Mobile({
//         ...req.body,
//         addedBy: req.user._id
//     });
//     try {
//         if (req.body.price < 1)
//             return res.status(400).json({ msg: 'Price cannot be 0 or negative' });
//         if (!(req.body.condition == "old" || req.body.condition == "new"))
//             return res.status(400).json({ msg: 'Condition can be either new or old' });
//         await mobile.save();
//         res.status(201).send(mobile);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

//route to get all mobiles
router.get('/mobile', async (req, res) => {
    try {
        const mobiles = await Mobile.find({});
        res.status(200).send(mobiles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//route to get mobiles added by oneself
router.get('/profileMobiles', authenticate, async (req, res) => {
    try {
        await req.user.populate({
            path: 'mobiles'
        }).execPopulate();
        res.status(200).send(req.user.mobiles);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//route to get mobiles added by any user 
//(takes id as argument)
router.get('/userMobiles/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.findById(userId);
        await user.populate({
            path: 'mobiles'
        }).execPopulate();
        res.status(200).send(user.mobiles);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//route to get single mobile details
router.get('/oneMobileWithOwner/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Mobile.findById(id).populate('addedBy', '-tokens -password -__v');
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.delete('/mobile/:id', authenticate, async (req, res) => {
    try {
        const mobile = await Mobile.findOneAndDelete({
            _id: req.params.id,
            addedBy: req.user._id
        })
        if (!mobile)
            return res.status(404).json({ msg: 'You are not authorized to delete items that you have not added' });
        res.status(200).send(mobile);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

//route to get one furniture details
router.get('/mobile/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Mobile.findById(id, 'title description price soldFrom condition brand -_id images').lean().exec();
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.patch('/mobile/:id', [
    authenticate,
    check('title', 'Title of ad is required').not().isEmpty(),
    check('description', 'Description of ad is required').not().isEmpty(),
    check('brand', 'Brand of mobile phone is required').not().isEmpty(),
    check('price', 'Price of ad is required').not().isEmpty(),
    check('soldFrom', 'Seller location of ad is required').not().isEmpty(),
    check('condition', 'Condition of mobile is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const id = req.params.id;
    try {
        let mobile = await Mobile.findOneAndUpdate({ _id: id, addedBy: req.user._id }, req.body, { new: true });
        if (!mobile)
            return res.status(400).json({ msg: 'You are either not authorized or the data does not exist' });
        res.status(200).send(mobile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


//  @NotUsed
//get user that has added the mobile
router.get('/getMobileOwner/:productId', async (req, res) => {
    const id = req.params.productId;
    try {
        const result = await Mobile.findById(id).populate('addedBy', '-tokens -password -__v');
        res.status(200).send(result.addedBy);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//toggle archive status
router.patch('/toggleArchiveMobile/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const currArchive = await Mobile.findById(id, 'archived');
        const result = await Mobile.findByIdAndUpdate(id, { archived: !currArchive.archived }, { new: true });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//delete route by admin
router.delete('/adminMobile/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Mobile.findByIdAndDelete(id);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Failed' });
    }
})

module.exports = router;