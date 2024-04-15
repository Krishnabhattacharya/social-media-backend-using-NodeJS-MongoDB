import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Database from './src/db/mongoose.js';
import userRoute from './src/routes/user.route.js';
import postRoute from './src/routes/post.route.js';
const app = express();
app.use(express.json());





app.use(morgan('dev'));
dotenv.config();
Database();
app.use(userRoute);
app.use(postRoute)




const PORT = process.env.PORT || 3030;
app.listen((PORT), () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);
})