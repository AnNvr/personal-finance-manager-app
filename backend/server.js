import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logEvents.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./config/corsOptions.js";
import { db } from "./config/db.js";
import { credentials } from "./middleware/credential.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import { validateErrorMiddleware } from "./middleware/validator.js";

const app = express();
const PORT = process.env.PORT || 3500;
db();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

import registerRouter from "./routes/register.js";
app.use(registerRouter);
import authRouter from "./routes/auth.js";
app.use(authRouter);
import refreshRouter from "./routes/refresh.js";
app.use(refreshRouter);
import logoutRouter from "./routes/logout.js";
app.use(logoutRouter);

app.use(verifyJWT);
import usersRouter from "./routes/api/users.js";
app.use(usersRouter);

app.use(errorHandler);
app.use(validateErrorMiddleware);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Express server running on port ${PORT}`);
    });
});
