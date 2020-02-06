const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/roster', require('./routes/api/roster'));
app.use('/api/todo', require('./routes/api/todo'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));