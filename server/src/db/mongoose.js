require('dotenv').config();
const mongoose = require('mongoose');
const connectionURL = process.env.MONGO_URL;

mongoose.connect(connectionURL);
