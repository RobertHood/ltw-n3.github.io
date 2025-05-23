const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT;

const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const commentsRouter = require('./routers/commentsRouter'); 

// Các router
const mediaRouter = require('./routers/mediaRouter');

const dashboardRoutes = require('./routers/dashboardRouter');

const esportsRouter = require('./routers/esportsRouter');
const analyticsRoutes = require('./routers/analyticsRouter');
app.use('/api/analytics', analyticsRoutes);
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/libs', express.static(path.join(__dirname, 'frontend/libs')));
// Cho phép truy cập ảnh trực tiếp
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully!');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/media', mediaRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', userRouter);
app.use('/api/esports', esportsRouter);  

app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`http://localhost:${PORT}`);
});