const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name : {type: String, required: true},
	email : {type: String, required: true},
	passwordHash : {type: String, required: true},
	profile_img : {
		_id:false,
		imageBuffer: {data: Buffer, contentType: String},
		imageType : {type: String}
	},
	moneyReserve: {type: Number},
	stocks : [{
		_id:false,
		stockName : {type: String},
		stockSymbol: {type: String},
		transactions: [{
			_id:false,
			amount : {type: Number},
			date : {type : String},
			price : {type : Number},
			fees: {type: Number},
			reinvested: {type: Number},
			addReserve: {type: Number}
		}],
		divTransactions : [{
			_id:false,
			date: {type : String},
			total : {type: Number},
			fees: {type: Number}
		}]	
	}]
});

const User = mongoose.model("user", userSchema);

module.exports = User;