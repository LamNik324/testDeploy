import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import User from "./models/user.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//                                          middleware for cors
// app.use(async (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

app.get('/test', (req, res) => {
  res.send('Im am alive')
})


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
