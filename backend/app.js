const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const documentRoutes = require('./routes/documentRoutes');
const { checkUser } = require('./middlewares/authMiddleware');

require('./DB/mongoose');

const app = express();

app.use(express.json()); // exept jaon data from user
app.use(cookieParser());

app.get('*', checkUser);

app.use("/api/users", authRoutes);
app.use("/api/docs", documentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})