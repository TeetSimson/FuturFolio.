const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");

dotenv.config();

// Set up server

const app = express();

app.listen(5000, () => console.log("App is running on port 5000"));

app.use(express.json());
app.use(cors({
	origin: ["http://localhost:3000"]
}));

// connect to mongodb

mongoose.connect(process.env.MDB_CONNECT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, (err) =>{
	if (err) return console.error(err);
	console.log("Connected to MongoDB")
});

// set up routes

app.use("/auth", require("./routers/userRouter"));
app.use("/stocks", require("./routers/stockRouter"));