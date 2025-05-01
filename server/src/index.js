import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from "./routes/user.routes.js"
import jobsRouter from "./routes/jobs.router.js"

dotenv.config();


const app = express();



app.use(
    cors({
    origin: [ process.env.CORS_ORIGIN || "*" ], 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
    "Origin",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Request-With",
    ],
    })
    );
app.use(bodyParser.json());

app.use('/api/users', userRouter)
app.use('/api/jobs', jobsRouter)



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});