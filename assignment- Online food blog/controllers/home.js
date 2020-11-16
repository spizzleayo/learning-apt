const express 		= require('express');
const multer            = require('multer');
const path              = require('path');
const loginModel		= require.main.require('./models/loginModel');
const userModel         = require.main.require('./models/userModel');
const router 		= express.Router();

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'assets/image/')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + path.extname(file.originalname)) 
	}
  });
  var upload = multer({ storage: storage });

router.get('/signup', (req, res)=>{
	res.render('user/signup');
});

router.post('/signup', upload.single('pic'), (req, res)=>{

    let user={
        image :  req.file.filename,
        name : req.body.name,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        phone : req.body.phone,
        address: req.body.address,
        role : 'user'
    
    };

    
    userModel.insert(user, function(status){

        if(status){
            console.log(user);
            res.redirect('/login');
           
            
        }else{
            res.redirect('/home/signup');

        }

    });


	
	
}); 

module.exports = router;