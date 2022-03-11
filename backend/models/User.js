const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please Enter Your Full Name']
        },
        email: {
            type: String,
            required: [true, 'Please Enter an Email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please Enter a Valid Email']
        },
        password:{
            type: String,
            required: [true, 'Please Enter a Password'],
            minlength: [6, 'Minimum Length is 6 Charecters']
        },
        documents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document"
        }],

    }
);

UserSchema.pre('save', async function (next) {

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// static method to login user ('login' is the name of the method)
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (user) 
    {
        const auth = await bcrypt.compare(password, user.password);

        if(auth)
        {
            return user;
        }
        throw Error('incorect password');
    }
    throw Error('incorect email');
}

const User = mongoose.model('user', UserSchema);

module.exports = User;