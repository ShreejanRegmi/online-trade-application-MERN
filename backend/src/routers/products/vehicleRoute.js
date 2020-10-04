const express = require('express');

const Vehicle = require('../../models/products/Vehicle');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const authenticate = require('../../middleware/authenticate');
const User = require('../../models/User');

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

router.post('/vehicle', authenticate, upload.array('images', 3), async (req, res) => {
    const { title, description, brand, kmDriven, mfgdYear, price, soldFrom, condition } = req.body;

    const veh = {
        title,
        description,
        price,
        soldFrom,
        condition,
        brand,
        kmDriven,
        mfgdYear,
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
        if (req.body.kmDriven < 0) {
            obj = [];
            return res.status(400).json({ msg: 'Distance travelled by vehicle cannot be negative' });
        }
        if (req.body.mfgdYear < 0) {
            obj = [];
            return res.status(400).json({ msg: 'Manufactured year cannot be negative' });
        }
        const vehicle = new Vehicle(veh);
        await vehicle.save();
        obj = [];
        res.status(201).send(vehicle);
    } catch (err) {
        console.error(err);
        obj = [];
        res.status(500).send('Server Error');
    }
})


// router.post('/vehicle', [
//     authenticate,
//     check('title', 'Title of ad is required').not().isEmpty(),
//     check('description', 'Description of ad is required').not().isEmpty(),
//     check('brand', 'Brand of vehicle is required').not().isEmpty(),
//     check('kmDriven', 'Total driven distance is required').not().isEmpty(),
//     check('mfgdYear', 'Vehicles manufactured year is required').not().isEmpty(),
//     check('price', 'Price of ad is required').not().isEmpty(),
//     check('soldFrom', 'Seller location of ad is required').not().isEmpty(),
//     check('condition', 'Condition of vehicle is required').not().isEmpty()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//         return res.status(400).json({ errors: errors.array() });
//     const vehicle = new Vehicle({
//         ...req.body,
//         addedBy: req.user._id
//     });
//     try {
//         if (req.body.price < 1)
//             return res.status(400).json({ msg: 'Price cannot be 0 or negative' });
//         if (!(req.body.condition == "old" || req.body.condition == "new"))
//             return res.status(400).json({ msg: 'Condition can be either new or old' });
//         if (req.body.kmDriven < 0)
//             return res.status(400).json({ msg: 'Distance travelled by vehicle cannot be negative' });
//         if (req.body.mfgdYear < 0)
//             return res.status(400).json({ msg: 'Manufactured year cannot be negative' });
//         await vehicle.save();
//         res.status(201).send(vehicle);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

//route to get all vehicles
router.get('/vehicle', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        res.status(200).send(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//route to get vehicles added by oneself
router.get('/profileVehicles', authenticate, async (req, res) => {
    try {
        await req.user.populate({
            path: 'vehicles'
        }).execPopulate();
        res.status(200).send(req.user.vehicles);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//route to get vehicles added by any user 
//(takes id as argument)
router.get('/userVehicles/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.findById(userId);
        await user.populate({
            path: 'vehicles'
        }).execPopulate();
        res.status(200).send(user.vehicles);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//route to get single vehicle details
router.get('/oneVehicleWithOwner/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Vehicle.findById(id).populate('addedBy', '-tokens -password -__v');
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//delete vehicle
router.delete('/vehicle/:id', authenticate, async (req, res) => {
    try {
        const vehice = await Vehicle.findOneAndDelete({
            _id: req.params.id,
            addedBy: req.user._id
        })
        if (!vehice)
            return res.status(404).json({ msg: 'You are not authorized to delete items that you have not added' });
        res.status(200).send(vehice);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

//route to get one vehicle
router.get('/vehicle/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Vehicle.findById(id, 'title description price soldFrom brand kmDriven mfgdYear condition -_id images').lean().exec();
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//route to edit posted vehicle details
router.patch('/vehicle/:id', [
    authenticate,
    check('title', 'Title of ad is required').not().isEmpty(),
    check('description', 'Description of ad is required').not().isEmpty(),
    check('brand', 'Brand of vehicle is required').not().isEmpty(),
    check('kmDriven', 'Total driven distance is required').not().isEmpty(),
    check('mfgdYear', 'Vehicles manufactured year is required').not().isEmpty(),
    check('price', 'Price of ad is required').not().isEmpty(),
    check('soldFrom', 'Seller location of ad is required').not().isEmpty(),
    check('condition', 'Condition of vehicle is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const id = req.params.id;
    try {
        let vehicle = await Vehicle.findOneAndUpdate({ _id: id, addedBy: req.user._id }, req.body, { new: true });
        if (!vehicle)
            return res.status(400).json({ msg: 'You are either not authorized or the data does not exist' });
        res.status(200).send(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


//@notUsed
//get user that has added the furniture
router.get('/getVehicleOwner/:productId', async (req, res) => {
    const id = req.params.productId;
    try {
        const result = await Vehicle.findById(id).populate('addedBy', '-tokens -password -__v');
        res.status(200).send(result.addedBy);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.patch('/toggleArchiveVehicle/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const currArchive = await Vehicle.findById(id, 'archived');
        const result = await Vehicle.findByIdAndUpdate(id, { archived: !currArchive.archived }, { new: true });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//route to delete by admin
router.delete('/adminVehicle/:id', adminCheck, async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Vehicle.findByIdAndDelete(id);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Failed' });
    }
})

module.exports = router;