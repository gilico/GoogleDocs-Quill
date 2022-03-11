const User = require('../models/User');
const jwt = require('jsonwebtoken');


const signup_post = async (req, res) => {
    console.log(req.body);
    const {name, email, password, confirmPassword} = req.body;

    try 
    {
        if(password === confirmPassword)
        {
            const user = await User.create({name, email, password});
            
            const token = createToken(user._id);
            
            res.cookie('newUser', token, {httpOnly: true, maxAge: age * 1000 });
            res.status(201).json({ name: user.name, userId: user._id, email: user.email, token: token }); // '201' success
        }
        else
        {
            throw Error("Passwords Don't Match")
        }
        
        
    } 
    catch (error) 
    {
        // console.log(error)
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try 
    {
        // send the 'login' methos the email & password
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('logged', token, { httpOnly: true, maxAge: age * 1000 });
        res.status(200).json({ name: user.name, userId: user._id, email: user.email, token: token });    
    } 
    catch (error) 
    {
        console.log(error)
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const logout_get = (req, res) => {
    // replace the login cookie with an ampty one that have age of 1 milli second
    res.cookie('logged', '', {maxAge: 1});
    res.send('User Logout');
    
}

const get_user = async (req,res) => {
    try {
        const user = await User.findOne({email: req.params.email})
        if(user)
            res.send("User Found");
        else
            res.status(500).send("User not found");
        
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}


const handleErrors = (err) => {
    let errors = { email: '', password: '', confPass: ''};

    // incorect email
    if(err.message === 'incorect email')
    {
        errors.email = 'That email is not registered'
    }

    // Passwords Don't Match
    if(err.message === "Passwords Don't Match")
    {
        errors.confPass = "Passwords Don't Match";
    }

    // incorect password
    if(err.message === 'incorect password')
    {
        errors.password = 'That password is incorect'
    }
    // duplicate error code
    if(err.code === 11000) // 11000 means it's the error that the email is not unique
    { 
        errors.email = 'That email is already registeresd';
        return errors; // no need to proceed
    }
    // validation errors
    if(err.message.includes('user validation failed'))
    {                                   // access the properties of error - instead of 'error.properties'
       Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message;
       });
    }

    return errors;
}




const age = 3 * 24 * 60 * 60; //*1000 = 3 days
const createToken = (id) => {
    return jwt.sign({ id }, 'mysecret', { expiresIn: age })
}


module.exports = { 
    signup_post, 
    login_post, 
    logout_get,
    get_user
}