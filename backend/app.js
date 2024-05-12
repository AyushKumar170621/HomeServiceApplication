const express = require("express");
const errorMiddleware = require("./middleware/error");

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();
const cors = require("cors")
// const buildPath=path.join(__dirname,"../client/build");
const cookieParser = require("cookie-parser");
const corsConfig = {
    origin: true,
    credentials: true,
  };

app.use(cors(corsConfig));
// app.use(express.static(buildPath));
app.use(express.json({ limit: "10mb" }))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const service = require("./routes/serviceRoute");
const user = require("./routes/userRoute");
const booking = require("./routes/bookingRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1",service);
app.use("/api/v1",user);
app.use("/api/v1",booking);
app.use("/api/v1",payment);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });
app.use(errorMiddleware);

module.exports = app;
