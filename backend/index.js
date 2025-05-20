const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api",router);

const PORT = 8080 || process.env.PORT;

console.log("connecting to DB ...");

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log("connect to DB");
        console.log("Server is running " + PORT);
    })
})
.catch((err) => {
    console.error("❌ Failed to connect to DB:", err.message);
  });