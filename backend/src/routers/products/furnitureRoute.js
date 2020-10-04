const express = require('express');

const Furniture = require('../../models/products/Furniture');
const Computer = require('../../models/products/Computer');
const Mobile = require('../../models/products/Mobile');
const Vehicle = require('../../models/products/Vehicle');


const User = require('../../models/User');
const { check, validationResult, body } = require('express-validator');

const router = express.Router();
const authenticate = require('../../middleware/authenticate');

const adminCheck = require('../../middleware/adminCheck');

const path = require('path');
const multer = require('multer');

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

/*     ---------------------------- 2nd Method---------------------         */
router.post('/furniture', authenticate, upload.array('images', 3), async (req, res) => {
    const { title, description, price, soldFrom, condition } = req.body;

    const fur = {
        title,
        description,
        price,
        soldFrom,
        condition,
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
        const furniture = new Furniture(fur)
        await furniture.save();
        obj = [];
        res.status(201).send(furniture);
    } catch (err) {
        console.error(err);
        obj = [];
        res.status(500).send('Server Error');
    }
});

//route to post ad for furniture
// router.post('/furniture', [
//     authenticate,
//     check('title', 'Title of ad is required').not().isEmpty(),
//     check('description', 'Description of ad is required').not().isEmpty(),
//     check('price', 'Price of ad is required').not().isEmpty(),
//     check('soldFrom', 'Seller location of ad is required').not().isEmpty(),
//     check('condition', 'Condition of furniture is required').not().isEmpty()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//         return res.status(400).json({ errors: errors.array() });
//     const furniture = new Furniture({
//         ...req.body,
//         addedBy: req.user._id
//     });
//     try {
//         if (req.body.price < 1)
//             return res.status(400).json({ msg: 'Price cannot be 0 or negative' });
//         if (!(req.body.condition == "old" || req.body.condition == "new"))
//             return res.status(400).json({ msg: 'Condition can be either new or old' });
//         await furniture.save();
//         res.status(201).send(furniture);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });


//route to get all furnitures
router.get('/furniture', async (req, res) => {
    try {
        const furnitures = await Furniture.find({});
        res.status(200).send(furnitures);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//route to get furnitures added by oneself
router.get('/profileFurnitures', authenticate, async (req, res) => {
    try {
        await req.user.populate({
            path: 'furnitures'
        }).execPopulate();
        res.status(200).send(req.user.furnitures);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//route to get furnitures added by any user 
//(takes id as argument)
router.get('/userFurnitures/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.findById(userId);
        await user.populate({
            path: 'furnitures'
        }).execPopulate();
        res.status(200).send(user.furnitures);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//route to get single furniture details
router.get('/oneFurnitureWithOwner/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Furniture.findById(id).populate('addedBy', '-tokens -password -__v');
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//route to delete furniture
router.delete('/furniture/:id', authenticate, async (req, res) => {
    try {
        const furniture = await Furniture.findOneAndDelete({
            _id: req.params.id,
            addedBy: req.user._id
        })
        if (!furniture)
            return res.status(404).json({ msg: 'You are not authorized to delete items that you have not added' });
        res.status(200).send(furniture);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

//route to get one furniture details
router.get('/furniture/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Furniture.findById(id, 'title description price soldFrom condition -_id images').lean().exec();
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//route to edit furniture details
router.patch('/furniture/:id', [
    authenticate,
    check('title', 'Title of ad is required').not().isEmpty(),
    check('description', 'Description of ad is required').not().isEmpty(),
    check('price', 'Price of ad is required').not().isEmpty(),
    check('soldFrom', 'Seller location of ad is required').not().isEmpty(),
    check('condition', 'Condition of furniture is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const id = req.params.id;
    try {
        let furniture = await Furniture.findOneAndUpdate({ _id: id, addedBy: req.user._id }, req.body, { new: true });
        if (!furniture)
            return res.status(400).json({ msg: 'You are either not authorized or the data does not exist' });
        res.status(200).send(furniture);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//common routes of all the product categories are here
router.get('/totalPriceValue', async (req, res) => {
    var criteria = {
        archived: false,
        userArchived: false
    };

    try {
        const resultF = await Furniture.aggregate([
            { $match: criteria },
            { $group: { _id: null, "totalPrice": { "$sum": "$price" } } }
        ])
        var furTot = resultF[0]["totalPrice"];
    } catch (error) {
        var furTot = 0;
    }

    try {
        const resultM = await Mobile.aggregate([
            { $match: criteria },
            { $group: { _id: null, "totalPrice": { "$sum": "$price" } } }
        ])
        var mobTot = resultM[0]["totalPrice"];
    } catch (error) {
        var mobTot = 0;
    }


    try {
        const resultV = await Vehicle.aggregate([
            { $match: criteria },
            { $group: { _id: null, "totalPrice": { "$sum": "$price" } } }
        ])
        var vehTot = resultV[0]["totalPrice"];
    } catch (error) {
        var vehTot = 0;
    }


    try {
        const resultC = await Computer.aggregate([
            { $match: criteria },
            { $group: { _id: null, "totalPrice": { "$sum": "$price" } } }
        ])
        var comTot = resultC[0]["totalPrice"];
    } catch (error) {
        var comTot = 0;
    }

    let total = furTot + mobTot + vehTot + comTot;
    res.status(200).json({ value: total });
})

router.get('/totalAdsCount', async (req, res) => {
    try {
        var criteria = {
            archived: false,
            userArchived: false
        };
        const fur = await Furniture.countDocuments(criteria);
        const mob = await Mobile.countDocuments(criteria);
        const veh = await Vehicle.countDocuments(criteria);
        const com = await Computer.countDocuments(criteria);
        const total = fur + mob + veh + com;
        res.status(200).json({ value: total })
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


router.patch('/toggleArchiveFurniture/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const currArchive = await Furniture.findById(id, 'archived');
        const result = await Furniture.findByIdAndUpdate(id, { archived: !currArchive.archived }, { new: true });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


router.delete('/adminFurniture/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Furniture.findByIdAndDelete(id);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Failed' });
    }
})

router.get('/upload', async (req, res) => {
    const current = __dirname;
    const otherFolder = path.join(__dirname, '../../../../client/public/images');
    res.send(__filename)
    // res.send({ path, new: process.cwd() });
})

router.post('/search', async (req, res) => {
    const { type, text, condition, priceMin, priceMax, cat } = req.body;
    const textReg = new RegExp(text, 'i');

    let searchObject = {};
    let priceObj = {};
    searchObject[type] = textReg;

    //new code begin
        searchObject['archived'] = 'false';
        searchObject['userArchived'] = 'false';
    //new code end

    if (condition === "new" || condition === "old")
        searchObject['condition'] = condition;

    if (priceMin || priceMax) {
        if (priceMin && !priceMax)
            priceObj['$gt'] = priceMin;
        if (!priceMin && priceMax)
            priceObj['$lt'] = priceMax;
        if (priceMin && priceMax) {
            priceObj['$gt'] = priceMin;
            priceObj['$lt'] = priceMax;
        }
        searchObject['price'] = priceObj;
    }

    if (cat === "all" || cat === "furnitures") {
        try {
            var furResult = await Furniture.find(searchObject)
        } catch (error) {
            var furResult = [];
            console.error(error)
        }
    }
    if (cat === "all" || cat === "mobiles") {
        try {
            var mobResult = await Mobile.find(searchObject)
        } catch (error) {
            var mobResult = [];
            console.error(error)
        }
    }
    if (cat === "all" || cat === "vehicles") {
        try {
            var vehResult = await Vehicle.find(searchObject)
        } catch (error) {
            var vehResult = [];
            console.error(error)
        }
    }
    if (cat === "all" || cat === "computers") {
        try {
            var comResult = await Computer.find(searchObject)
        } catch (error) {
            var comResult = [];
            console.error(error)
        }
    }

    if (cat === "all")
        return res.status(200).send([...furResult, ...mobResult, ...vehResult, ...comResult]);
    else if (cat === "furnitures")
        return res.status(200).send(furResult);
    else if (cat === "mobiles")
        return res.status(200).send(mobResult);
    else if (cat === "computers")
        return res.status(200).send(comResult);
    else if (cat === "vehicles")
        return res.status(200).send(vehResult);


})


module.exports = router;