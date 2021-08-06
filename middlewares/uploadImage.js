const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./upload/",
    filename: (req, file, fileName) => {
        return fileName(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

exports.upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
            return callback(new Error("Only images are allowed"));
        }
        callback(null, true);
    },
});