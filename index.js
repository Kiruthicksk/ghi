
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const airlineRoute = require("./Routes/airlineRoute");
const scheduleRoute = require("./Routes/scheduleRoute");
const bookingRouter=require('./Routes/bookingRoute')
const app = express();
const allowedOrigins = ['http://localhost:3000',"https://mern-flight-booking-system.netlify.app"];
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();
app.use(express.json())
mongoose
  .connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/user", userRoute);
app.use("/airline", airlineRoute);
app.use("/admin",scheduleRoute);
app.use("/customer",bookingRouter)
app.get("/",(req,res)=>{
    res.send("This is the a backend server");
})
app.get("/users",(req,res)=>{
    res.send("This is the for server");
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
