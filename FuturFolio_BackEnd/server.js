const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const cors = require("cors");

dotenv.config();

// Set up server

const app = express();

app.listen(5000, () => console.log("App is running on port 5000"));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true,
}));

// connect to mongodb

mongoose.connect(process.env.MDB_CONNECT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}, (err) =>{
	if (err) return console.error(err);
	console.log("Connected to MongoDB")
});

// set up routes

app.use("/auth", require("./routers/userRouter"));
app.use("/stocks", require("./routers/stockRouter"));
app.use("/userProfile", require("./routers/userDetailsRouter"))
app.use("/APIstocks", require("./API_stock_call/stocks_API"));
app.use("/APIstocks", require("./API_stock_call/Mstocks_API.js"));
app.use("/APIstocks", require("./API_stock_call/StocksUpdate.js"));

// In good usage
app.use("/APIstocks", require("./API_stock_call/SearchYahooStock.js"));
