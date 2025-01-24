const express = require("express");
const app = express();
const database = require("./Config/Database");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const userRoutes = require("./Routes/User");
const categoryRoutes = require("./Routes/CategoryRoutes");
const bookRoutes = require("./Routes/bookRoutes")
const path = require("path");



dotenv.config();
const PORT = process.env.PORT || 8000;
database.connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: '/tmp/'
}));

app.use(express.static(path.join(__dirname, 'images')));

//routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", bookRoutes);


//default route
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: 'Your server is up and running....'
	});
});


app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: 'Internal Server Error'
	});
	process.exit(1);
});



app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

