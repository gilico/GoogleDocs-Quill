const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/copyleaks').then(console.log("DB is connected"));

//mongodb+srv://gilco77:gilco235689@copyleaksdb.nygmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority