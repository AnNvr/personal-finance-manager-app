import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { db } from "./config/db.js";
import { corsOptions } from "./config/corsOptions.js";

const app = express();
const PORT = process.env.PORT || 3500;
db();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Express server running on port ${PORT}`);
    });
});
