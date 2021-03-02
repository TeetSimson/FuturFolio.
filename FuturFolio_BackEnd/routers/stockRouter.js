const router = require("express").Router();
const User = require("../models/userModel");

router.post("/", async (req,res) => {
	try{

		const {email, stock} = req.body;

		if(!stock)
			return res.status(400).json({errorMessage : "You have not invested in this stock"});

		const userDetails = await User.findOne({email});

		const stocksList = await userDetails.stocks ;

		const chosenStock = await stocksList.find(obj =>{
			return obj.stockName === stock ;
		});

		const amount = await chosenStock.amount ;
		const date = await chosenStock.date;
		const price = await chosenStock.price;


		res.send({"amount":amount,
			"date":date,
			"price":price});

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;