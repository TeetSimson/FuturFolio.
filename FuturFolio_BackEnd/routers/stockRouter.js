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
			
			const newTransaction = {
					"amount": amount,
					"date": date,
					"price": price,
					"fees": -fees,
					"reinvested": reinvest
			};

			existingStock.transactions.push(newTransaction);

			await User.findOneAndUpdate(
				{"_id":id,"stocks.stockName": existingStock.stockName},
				{$set:{"stocks.$.transactions" : existingStock.transactions}}
			);	


			return res.json({Message : "You have added an transaction"});

		} else {

			const newStock = {
				"stockName": stockName,
				"stockSymbol": stockSymbol,
				"transactions": [{
					"amount": amount,
					"date": date,
					"price":price,
					"fees": -fees,
					"reinvested": reinvest
				}],
				"divTransactions":[]
			};

			console.log(newStock);
			
			await User.findByIdAndUpdate(
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


router.post("/sellStock", auth, async (req,res) => {
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
			
			const newTransaction = {
					"amount": -amount,
					"date": date,
					"price": price,
					"fees": -fees,
					"addReserve": reserve
			};

			existingStock.transactions.push(newTransaction);


			await User.findOneAndUpdate(
				{"_id":id,"stocks.stockName": existingStock.stockName},
				{$set:{"stocks.$.transactions" : existingStock.transactions}}
			);	
			console.log("DONE");
			return res.json({Message : "You have added an transaction"});
		} else {
			return res.json({Message : "Can´t sell a stock you don´t have"});
		}

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

router.post("/addDividend", auth, async (req,res) => {
	try{
		const id = req.user;
		const {stockName,date,total,fees} = req.body;

		if(!stockName||!date||!total||!fees)
			return res.status(400).json({errorMessage: "Please fill in all fields!"});


		const userDetails = await User.findById(id);
		const stocksList = await userDetails.stocks;
		const existingStock = await stocksList.find(obj =>{
			return obj.stockName === stockName;
		});

		if(!existingStock)
			return res.status(400).json({errorMessage: "Cannot add dividend to stock you do not own."})
			
		const newDividend = {
				"date": date,
				"total": total,
				"fees": -fees
		};

		existingStock.divTransactions.push(newDividend);

		await User.findOneAndUpdate(
			{"_id":id,"stocks.stockName": existingStock.stockName},
			{$set:{"stocks.$.divTransactions" : existingStock.divTransactions}}
		);	


		return res.json({Message : "You have added a dividend transaction"});

	}catch (err){
		console.error(err);
		res.status(500).send();
	}
});

router.post("/removeStock", auth, async (req,res) => {
	try{

		const id =req.user;
		const {stockName} = req.body;

		if(!stockName)
			return res.status(400).json({errorMessage: "Please enter a stock."})

		const userDetails = await User.findById(id);
		const stocksList = await userDetails.stocks;
		const existingStock = await stocksList.find(obj =>{
			return obj.stockName === stockName;
		});

		if(!existingStock)
			return res.json({errorMessage: "You cannot remove a stock you do not own."});

		
		const updatedStocksList = stocksList.filter(function(value, index, arr){ 
        	return value != existingStock;
        });

        

        await User.findByIdAndUpdate(
        	id,
        	{$set:{stocks:updatedStocksList}}
        );


	}catch(err){
		console.error(err);
		res.status(500).send();
	}
})



module.exports = router;