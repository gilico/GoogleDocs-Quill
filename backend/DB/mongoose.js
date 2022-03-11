const mongoose = require('mongoose');

try {
    mongoose.connect('mongodb://localhost:27017/copyleaks').then(console.log("DB is connected"));
} catch (error) {
    console.log("Db is failed to connect");
}
