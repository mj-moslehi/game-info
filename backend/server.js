const express = require("express");
const cors = require("cors");
const UserRoutes = require("../backend/routes/userRoutes.js");
const GameInfoRoutes = require("../backend/routes/gameInfoRoutes.js");
const connectDB = require("../backend/config/mongoDB");
require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5174",
        methods: ["POST", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

try {
    connectDB();
} catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
}

app.use("/user", UserRoutes);
app.use("/gameInfo", GameInfoRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "An unexpected error occurred."});
    next();
});

app.listen(process.env.PORT);
