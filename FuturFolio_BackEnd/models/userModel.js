const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name : {type: String, required: true},
	email : {type: String, required: true},
	passwordHash : {type: String, required: true},
	profile_img : {
		imageBuffer: {data: Buffer, contentType: String},
		imageType : {type: String}
	},
	moneyReserve: {type: Number},
	stocks : [{
		_id:false,
		stockName : {type: String},
		stockSymbol: {type: String},
		transactions: [{
			amount : {type: Number},
			date : {type : String},
			price : {type : Number},
			fees: {type: Number},
			reinvested: {type: Number},
			addReserve: {type: Number}
		}],
		divTransactions : [{
			date: {type : String},
			total : {type: Number},
			fees: {type: Number}
		}]	
	}]
});

const User = mongoose.model("user", userSchema);

module.exports = User;