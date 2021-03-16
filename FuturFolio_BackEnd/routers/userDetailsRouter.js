const router = require("express").Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();

router.post("/profileImage", auth,upload.single("image"), async (req,res) =>{
	try{
		const image = req.file.buffer;

		if(!image)
			return res.status(400).json({errorMessage: "No image detected"});

		const userDetails = await User.findById(id);

		User.findByIdAndUpdate(id,{profile_img : image}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    });
		console.log("sent");

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

router.get("/profileImageRetrieve", auth,upload.single("image"), async (req,res) =>{
	try{
		
		userDetails = await User.findById(id);

		console.log(userDetails);

		image = await userDetails.profile_img;


		res.send(image);



	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});



module.exports = router;