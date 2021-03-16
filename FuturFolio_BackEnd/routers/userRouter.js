const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var validator = require("email-validator");

router.post("/register", async (req,res) => {
	try{

	const { name, email, password /*, passwordVerify */} = req.body;

	// validation

	if(!name || !email || !password /*|| !passwordVerify*/ )
		return res.status(400).json({errorMessage : "Please fill all required fields."});

	if(!validator.validate(email))
		return res.status(400).json({errorMessage : "Please enter a valid email address."})

	if ( password.length < 6)
		return res.status(400).json({errorMessage : "Password must be at least 6 characters."});

/*	if ( password !== passwordVerify)
		return res.status(400).json({errorMessage : "Passwords do not match."});
*/

	const existingUser = await User.findOne({email});
	if(existingUser)
		return res.status(400).json({errorMessage : "An account with this email address already exists"});

	// hash the password
	// WE NEED PEPPER
	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(password, salt);

	// save user to database

	const newUser = new User({
		name, email, passwordHash
	});

	const savedUser = await newUser.save();

	//sign the token

	const token = jwt.sign({
		user: savedUser._id
	},
	process.env.JWT_SECRET
	);

	//send the token

	res.cookie("token",token,{
		httpOnly:true,
	}).send();


	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});



router.post("/signin", async (req,res) => {

	try{

		const {email,password} =req.body;
		const oneDayToSeconds = 24 * 60 * 60;

		if(!email || !password)
			return res.status(400).json({errorMessage: "Please fill all required fileds."});

		User.findOne({email})
		.then( existingUser => {
			if(!existingUser)
				return res.status(401).json({errorMessage : "Please enter a valid email address."});

			bcrypt.compare(password, existingUser.passwordHash)
			.then(passwordCorrect => {
				if (!passwordCorrect)
					return res.status(401).json({errorMessage: "Please enter a valid password."});

				//sign token
				
				jwt.sign({
					user: existingUser._id,
					maxAge: oneDayToSeconds,
					// Forces to use https in production
					secure: process.env.NODE_ENV === 'production'? true: false
				},
				process.env.JWT_SECRET,
				(err, token) => {
					if (err) throw err;
					res.json({
						auth: true,
						token: token,
						userID: existingUser._id,
						userName: existingUser._name
					});
				});
			});
		});

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

router.get("/logout", (req,res) =>{
	res.cookie("token","",{
		httpOnly: true,
		expires: new Date(0)
	}).send();
});

module.exports = router;