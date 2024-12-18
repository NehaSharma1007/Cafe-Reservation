import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js"; 
import { errorMiddleware } from "./error/error.js"
import reservationRouter from "./routes/reservationRoute.js"

const app = express();
dotenv.config({ path: "./config/config.env"});

const allowedOrigin = [
    "http://localhost:5173",
]

app.use(cors({
    origin : function(origin, callback){
        if(!origin || allowedOrigin.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('Not Allowed By CORS'))
        }
    },
    credentials : true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/v1/reservation',reservationRouter);

dbConnection();

app.use(errorMiddleware);

export default app; 