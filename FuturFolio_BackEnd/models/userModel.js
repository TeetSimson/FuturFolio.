const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name : {type: String, required: true},
	email : {type: String, required: true},
	passwordHash : {type: String, required: true},
	stocks : [{
		_id:false,
		stockName : {type: String},
		amount : {type: Number},
		date : {type : String},
		price : {type : Number},
		dividends : {type: Number}
	}]
});

const User = mongoose.model("user", userSchema);

module.exports = User;