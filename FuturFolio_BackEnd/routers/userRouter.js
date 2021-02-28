const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req,res) => {
	try{

	console.log("attempting login");
	const { name, email, password /*, passwordVerify */} = req.body;

	// validation

	if(!name || !email || !password /*|| !passwordVerify*/ )
		return res.status(400).json({errorMessage : "Please fill all required fields."});

	if ( password.length < 6)
		return res.status(400).json({errorMessage : "Password must be at least 6 characters."});

/*	if ( password !== passwordVerify)
		return res.status(400).json({errorMessage : "Passwords do not match."});
*/

	const existingUser = await User.findOne({email});
	if(existingUser)
		return res.status(400).json({errorMessage : "An account with this email address already exists"});

	// hash the password

	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(password, salt);

	// save user to database

	const newUser = new User({
		name, email, passwordHash
	});

	const savedUser = await newUser.save();


	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});



router.post("/signin", async (req,res) => {
	try{

		const {email,password} =req.body;

		if(!email || !password)
			return res.status(400).json({errorMessage: "Please fill all required fileds."});

		const existingUser = await User.findOne({email});
		if(!existingUser)
			return res.status(401).json({errorMessage : "Please enter a valid email."});

		const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
		if (!passwordCorrect)
			return res.status(401).json({errorMessage: "Please enter a valid password."});

		console.log("signed in");

	}catch (err){
		console.error(err);
		res.status(500).send();
	}

});



module.exports = router;