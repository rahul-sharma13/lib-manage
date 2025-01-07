import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors";



//flies
import connectDB from './config/db.js';
import authRoutes from  './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js';

//configuration
dotenv.config();
connectDB();


const app=express();

app.get("/", (req, res) => {
  res.send("server is running fine");
});

//middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

const port=process.env.PORT || 3000;
//console.log(process.env.PORT);

//routes

app.use("/api/vv/auth",authRoutes);
app.use("/api/vv/books",bookRoutes);
app.use("/api/vv/transaction",transactionRoutes);


app.listen(port,()=>console.log(`server listening on port ${port}`));