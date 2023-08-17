const multer = require('multer');
const path = require('path');
console.log('start');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, './multerImages');
    console.log('reached destination');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    console.log('reached filename:', name); // Log the filename here   
     cb(null, name);
  }
});



// const imageFilter = function (req, file, cb) {
//   // Accept images only
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     req.fileValidationError = 'Only image files are allowed!';
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

const upload = multer({ storage: storage});

module.exports = {
  upload
};
