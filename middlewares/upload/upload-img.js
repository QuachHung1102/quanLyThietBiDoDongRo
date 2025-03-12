// multer
const multer = require('multer');
const mkdirp = require('mkdirp');

const uploadImage = (type) => {
    mkdirp.sync(`./public/uploads/images/${type}`);
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./public/uploads/images/${type}`); // setup nơi lưu file
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname); // đặt lại tên cho file
        }
    });
    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            const extensionImgageList = [`png`, `jpg`];
            const extension = file.originalname.split('.').pop();
            const checkExtension = extensionImgageList.includes(extension);
            if (checkExtension) {
                cb(null, true);
            } else {
                cb(new Error('Extension not invalid'));
            }
        },
        limits: {
            fieldSize: 5 * 1024 * 1024,
        }
    });
    return upload.single(type)
}

module.exports = {
    uploadImage,
};
