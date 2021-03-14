const jwt = require("jsonwebtoken");

function auth(req,res,next) {
	try{
		const token = req.body.token;
		// Check for token
		if(!token)
			return res.status(401).json({errorMessage: "Unauthorized! No token!"});

		// Verify token
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		// Add user from payload
		req.user = verified.user;

		next();

	}catch (err){
		console.error(err);
		res.status(401).json({errorMessage: "Unauthorized! Invalid Token!"});
	}
}

module.exports = auth;