import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
// import path from "path"
// import {fileURLToPath} from "url"

// import Razorpay from 'razorpay';

dotenv.config()

//database config
connectDB()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)

//rest object
const app = express();
const PORT = process.env.PORT

//middleware
app.use(cors({
    origin: 'https://frontend-sepia-psi-61.vercel.app', // Adjust this based on your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust allowed methods as needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Allow cookies to be sent across domains
}));

// app.options('*', cors({
//     origin: 'https://shopstore-frontend.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));


app.use(bodyParser.json()); 
app.use(express.json())
app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, '../client/build')));

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)



//rest api
app.get('/', (req, res) => {
    res.send('<h1>Welcome to eCommerce App</h1>');
});

// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })

//PORT
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.MODE} port ${PORT}`);
});
