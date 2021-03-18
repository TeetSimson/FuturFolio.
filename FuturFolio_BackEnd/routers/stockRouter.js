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
		const {stockName,stockSymbol,amount,date,price,fees,reinvest} = req.body;

		if(!stockName)
			return res.status(400).json({errorMessage: "Please fill in infromation!"});

		if(stockName && stockSymbol && amount && (!date || !price))
			return res.status(400).json({errorMessage: "Please fill in price and date"});

		if(stockName && stockSymbol && (!amount||!date) && price)
			return res.status(400).json({errorMessage: "Please fill in amount and date"});


		const userDetails = await User.findById(id);
		const stocksList = await userDetails.stocks;
		const existingStock = await stocksList.find(obj =>{
			return obj.stockName === stockName;
		});

		console.log("user stock check: ", existingStock);
		if(existingStock) {
			
			let updateStock = {
				"transactions": {
					"amount": amount,
					"date": date,
					"price": price,
					"fees": fees,
					"reinvested": reinvest
				}
			};

			const Pushed = await User.findByIdAndUpdate(
				id,
				{ $push: { stocks: updateStock } }
				);

			return res.json({Message : "You have added an transaction"});

		} else {

			let newStock = {
				"stockName": stockName,
				"stockSymbol": stockSymbol,
				"transactions": {
					"amount": amount,
					"date": date,
					"price":price,
					"fees": -fees,
					"reinvested": reinvest
				}
			};
			
			const Pushed = await User.findByIdAndUpdate(
				id,
				{ $push: { stocks: newStock  } }
				);

			return res.json({Message : "You have added an transaction"});
		}

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});


router.post("/stockSell", auth, async (req,res) => {
	try{
		const id = req.user;
		const {stockName,stockSymbol,amount,date,price,fees,reserve} = req.body;

		if(!stockName)
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

		console.log("user stock check: ", existingStock);
		if(existingStock) {
			
			const updateStock = {
				"transactions": {
					"amount": -amount,
					"date": date,
					"price": price,
					"fees": -fees,
					"addReserve": reserve
				}
			};

			const options = { upsert: true };
			const filter = { stockName: stockName };
			const result = await User.findById(id).updateOne(filter, updateStock, options);

			/* const Pushed = await User.findById(id).findOneAndUpdate()(
				filter,
				{ $push: { stocksName: updateStock } }
				); */
			console.log("DONE");
			return res.json({Message : "You have added an transaction"});
		} else {
			return res.json({Message : "Can´t sell a stock You don´t have"});
		}

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;