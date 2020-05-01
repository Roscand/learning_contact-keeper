// dependencies
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// app init
const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// routing
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));