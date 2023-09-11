// // const multer = require('multer');
// // console.log('reached destinati');

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     const destinationPath = '../config/multerImages/img';
// //     console.log('reached destination');
// //     cb(null, destinationPath);
// //   },
// //   filename: function (req, file, cb) {
// //     const name = Date.now() + '-' + file.originalname;
// //     console.log('reached filename:', name); 
// //      cb(null, name);
// //   }
// // });



// // const imageFilter = function (req, file, cb) {
// //   console.log("first filter")
// //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
// //     req.fileValidationError = 'Only image files are allowed!';
// //     return cb(new Error('Only image files are allowed!'), false);
// //   }
// //   cb(null, true);
// // };

// // const upload = multer({ storage: storage,fileFilter: imageFilter});

// // module.exports = {
// //   upload
// // };

// const multer = require('multer');


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../models')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })


// module.exports = {
//      upload
//  };



const  multer=require('multer')

const path= require('path')


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/multer'))

    },
    filename:function(req,file,cb){
           
      const name= Date.now()+'-'+file.originalname
        cb(null,name)
      
    }
})
const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload =multer({storage:storage})


module.exports={
    upload
}























