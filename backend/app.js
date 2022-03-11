const express = require('express');
const { join } = require('path');
require('./DB/mongoose');

const app = express();

let toSend = {
    firstName : "Jhon",
    lastName: "Doe"
}

app.get('/api/file', (req,res) => {
    res.send(toSend);
})





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})