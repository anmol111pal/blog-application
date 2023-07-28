const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config()

const userRoute = require("./routes/userRoute.js");
const blogRoute = require("./routes/blogsRoute.js");
const mongoose = require("mongoose");

const app = express();
const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 5000;

const connect = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blog-app";
        console.log("Connecting to db ...");
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to the DB!");
    } catch(err) {
        console.log("Error connecting to the db.", err);
    }
}

// connect to the db
connect();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies)
  };
app.use(cors(corsOptions));

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

app.listen(PORT, () => {
    console.log(`Server listening on: ${HOSTNAME}:${PORT}`);
});
