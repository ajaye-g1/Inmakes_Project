require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const fs = require('fs');
const app = express();
let bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors');

// Add CORS middleware to your backend server. Since your frontend is running on port 3000 and backend on port 5000, you'll need to enable cross-origin requests. npm install cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

let indexRouter = require('./routes/index.routes')

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});