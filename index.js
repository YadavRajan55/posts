const express = require('express');
const { sequelize, connectDB } = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport')(passport);

const app = express();

connectDB()
// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
