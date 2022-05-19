require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

const sessionConf = require("./conf/session.conf");
require("./conf/passport.conf");
const corsConf = require("./conf/cors.conf");

const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const businessRouter = require("./routes/business.router");
const supplierRouter = require("./routes/supplier.router");
const materialRouter = require("./routes/material.router");
const batchesRouter = require("./routes/batches.router");
const productRouter = require("./routes/product.router");

const { isAuth } = require("./middleware");

const app = express();

app.use(morgan("dev"));
app.use(corsConf);
// parse body middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// express-session middleware
app.use(sessionConf);

// passportJS middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", authRouter);

// protected routes
app.use("/api/user", isAuth, userRouter);
app.use("/api/business", isAuth, businessRouter);
app.use("/api/supplier", isAuth, supplierRouter);
app.use("/api/material", isAuth, materialRouter);
app.use("/api/batches", isAuth, batchesRouter);
app.use("/api/product", isAuth, productRouter);

app.listen(5000, () => console.log("http://localhost:5000"));
