const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');


const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const commentsRouter = require('./routers/commentsRouter'); 

// Các router
const mediaRouter = require('./routers/mediaRouter');
app.use('/api/media', mediaRouter);

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'frontend')));

// Cho phép truy cập ảnh trực tiếp
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected successfully!');
}
).catch((err) => {
    console.error('MongoDB connection error:', err);
}
);


app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);  

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});