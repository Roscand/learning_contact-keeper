// dependencies
const express = require('express');

// app init
const app = express();

// routing
app.get('/', (req, res) => res.json({ msg: 'Welcome to the Contact Keeper API!' }))
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));