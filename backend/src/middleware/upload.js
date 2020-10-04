const path = require('path');
const multer = require('multer');
var obj = [];

var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destFolder = path.join(__dirname, '../../../client/public/images');
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
module.exports = { obj, upload };
