const router = require("express").Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth")

router.post("/", auth, async (req,res) => {
	try{

		/*const {email} = req.body;*/
		const userDetails = await User.findById(req.user);

		const stocksList = await userDetails.stocks ;



		res.send(stocksList);

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

router.post("/newStock", auth, async (req,res) => {
	try{
		const id = req.user;
		const {stockName,amount,date,price,dividends} = req.body;

		if(!stockName||!amount||!date||!price||!dividends)
			return res.status(400).json({errorMessage: "Please fill in all fields"});

		const userDetails = await User.findById(id);

		const stocksList = await userDetails.stocks;

		const existingStock = await stocksList.find(obj =>{
			return obj.stockName === stockName ;
		});

		if(existingStock)
			return res.status(400).json({errorMessage : "You have already invested in this stock"});

		var newStock = {
			"stockName":stockName,
			"amount":amount,
			"date":date,
			"price":price,
			"dividends":dividends
		};

		User.findByIdAndUpdate(
			id,
			{ $push: { stocks: newStock  } }
			);

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;