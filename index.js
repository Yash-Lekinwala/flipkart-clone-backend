import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import authRoutes from "./src/routes/auth.js";
import adminAuthRoutes from "./src/routes/admin/auth.js";
import categoryRoutes from "./src/routes/category.js";
import productRoutes from "./src/routes/product.js";
import cartRoutes from "./src/routes/cart.js";
import initialData from './src/routes/admin/initialData.js';

const app = express();
dotenv.config();

// app.use(express.json({limit: "30mb", extended: true}));
app.use(express.json());
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
const __dirname = path.resolve();

app.use('/public', express.static(path.join(__dirname, 'src/uploads')))
app.use('/api', authRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialData);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
    .catch((error) => console.log(error.message));