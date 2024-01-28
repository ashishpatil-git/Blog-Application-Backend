import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/api",router);

mongoose.connect(`mongodb+srv://ap7649649:${process.env.MONGOKEY}@accenture.jmsdgld.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Database Connected and App is up and runnning on ${PORT}`)
    });
}).catch((err)=>console.log("Error occured",err));