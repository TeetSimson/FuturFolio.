const router = require("express").Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();

router.post("/profileImage",upload.array("image","token"), auth, async (req,res) =>{
	try{
		const id = req.user;
		const imageBuffer = req.files[0].buffer;
		const imageType = req.files[0].mimetype

		/*console.log(req.user);
		console.log(req.files[0]);

		console.log(image);*/

		if(!imageBuffer)
			return res.status(400).json({errorMessage: "No image detected"});

		/*if(!(imageType == 'image/jpeg'))
			return res.status(400).json({errorMessage: "Please use a jpg image"});*/

		/*const userDetails = await User.findById(id);*/

		const image = {
			"imageBuffer" : imageBuffer,
			"imageType" : imageType
		}

		User.findByIdAndUpdate(id,{profile_img : image});
		

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

router.post("/profileImageRetrieve", auth, async (req,res) =>{
	try{
		
		const id = req.user;

		userDetails = await User.findById(id);

		image = await userDetails.profile_img;

		console.log(userDetails);
		console.log(image);
		

		res.send(image);



	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});



module.exports = router;