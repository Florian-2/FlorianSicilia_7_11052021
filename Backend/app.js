const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const path = require('path');

const app = express();

app.use(helmet());
app.use(cors());

// Routes
const userRoutes = require('./Routes/Route_user');
const postRoutes = require('./Routes/Route_post');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;