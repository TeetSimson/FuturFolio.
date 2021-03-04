const router = require("express").Router();
const User = require("../models/userModel");

router.post("/", async (req,res) => {
	try{

		const {email} = req.body;


		const userDetails = await User.findOne({email});

		const stocksList = await userDetails.stocks ;



		res.send(stocksList);

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

router.post("/newStock", async (req,res) => {
	try{

		const {email,stockName,amount,date,price,dividends} = req.body;

		if(!email||!stockName||!amount||!date||!price||!dividends)
			return res.status(400).json({errorMessage: "Please fill in all fields"});

		const userDetails = await User.findOne({email});

		const stocksList = await userDetails.stocks;

		const existingStock = await stocksList.find(obj =>{
			return obj.stockName === stockName ;
		});

		if(existingStock)
			return res.status(400).json({errorMessage : "You have already invested in this stock"});

		var newStock = {"stockName":stockName,
			"amount":amount,
			"date":date,
			"price":price,
			"dividends":dividends};

		User.findOneAndUpdate(
			{ email:email }, 
			{ $push: { stocks: newStock  } }
			);

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;