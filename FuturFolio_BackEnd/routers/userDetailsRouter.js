const router = require("express").Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();
const bcrypt = require("bcryptjs");

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

router.post("/changeName",auth,async(req,res)=>{
	try{

		const id = req.user;
		const {name} = req.body;

		if(!name)
			return res.status(400).json({errorMessage:"Please enter a name."})

		await User.findByIdAndUpdate(
			id,
			{$set:{name:name}})

	}catch (err){
		console.error(err)
		res.status(500).send
	}
})

router.post("/changePassword", auth, async (req,res) =>{
	try{
		
		const id = req.user;
		const {currentPassword,newPassword,newPasswordVerify} = req.body;

		if(!currentPassword||!newPassword||!newPasswordVerify)
			return res.status(400).json({errorMessage:"Please fill all required fields."});

		if(newPassword!=newPasswordVerify)
			return res.status(400).json({errorMessage:"New passwords do not match."});

		userDetails = await User.findById(id);


		bcrypt.compare(currentPassword, userDetails.passwordHash)
		.then(passwordCorrect => {
			if (!passwordCorrect)
				return res.status(401).json({errorMessage: "Please enter a valid current password."});
		});

		bcrypt.compare(newPassword, userDetails.passwordHash)
		.then(passwordCorrect => {
			if (passwordCorrect)
				return res.status(401).json({errorMessage: "New password cannot be the same as old password."});
		});

		const salt = await bcrypt.genSalt();
		const newPasswordHash = await bcrypt.hash(newPassword, salt);

		await User.findByIdAndUpdate(
			id,
			{$set:{passwordHash:newPasswordHash}});


	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

router.post("/closeAccount", auth, async (req,res) =>{
	try{
		id = req.user;
		await User.findByIdAndRemove(id);
	}catch(err){
		console.error(err);
		res.status(500).send();
	}
});



module.exports = router;