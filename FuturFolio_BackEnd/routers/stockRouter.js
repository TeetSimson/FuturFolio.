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
		const {stockName,stockSymbol,amount,date,price,fees} = req.body;

		if(!stockName||!stockSymbol||!amount||!date||!price||!fees)
			return res.status(400).json({errorMessage: "Please fill in infromation!"});

		if(stockName && stockSymbol && amount && (!date || !price))
			return res.status(400).json({errorMessage: "Please fill in price and date"});

		if(stockName && stockSymbol && (!amount||!date) && price)
			return res.status(400).json({errorMessage: "Please fill in amount and date"});


		const userDetails = await User.findById(id);
		console.log("user found");
		const stocksList = await userDetails.stocks;
		console.log("user details found");
		const existingStock = await stocksList.find(obj =>{
			return obj.stockName === stockName;
		});

		await console.log("user stock check: ", existingStock);
		if(existingStock) {
			
			var updateStock = {
				"transactions": {
					"amount": amount,
					"date": date,
					"price": price,
					"fees": fees
				}
			};

			await User.findByIdAndUpdate(
				id,
				{ $push: { stocks: updateStock } }
				);
			console.log("DONE");
			return res.json({Message : "You have added an transaction"});
		} else {
			var newStock = {
				"stockName": stockName,
				"stockSymbol": stockSymbol,
				"transactions": {
					"amount": amount,
					"date": date,
					"price":price,
					"fees": fees
				},
				"divTransactions" : [{
					
				}]
			};

			await User.findByIdAndUpdate(
				id,
				{ $push: { stocks: newStock  } }
				);
		}

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;