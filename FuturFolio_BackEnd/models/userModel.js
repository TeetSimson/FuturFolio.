const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name : {type: String, required: true},
	email : {type: String, required: true},
	passwordHash : {type: String, required: true},
	stocks : [{
		stockName : {type: String},
		amount : {type: Number},
		date : {type : String},
		price : {type : Number}
	}]
});

const User = mongoose.model("user", userSchema);

module.exports = User;