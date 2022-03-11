const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    // grab the token of registered user that called 'logged'
    const token = req.cookies.logged;

    if(token)
    {
        // use the jwt module 'verify' method and pass it the token and the secret we used to create token
        jwt.verify(token, 'mysecret', (err) => {
            if(err)
            {
                console.log(err.message);
                res.redirect('/login');
            }
            else
            {
                next();
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
}

// check current user 
const checkUser = (req, res, next) => {
    const token = req.cookies.logged;

    if(token)
    {
        // take the token and the secret and decode it to 'decodedToken'
        jwt.verify(token, 'mysecret', async (err, decodedToken) => {
            if(err)
            {
                console.log(err.message);
                res.location.user = null; // must pass the 'user' variable
                next();
            }
            else
            {
                // finds the user's details that logged in
                let user = await User.findById(decodedToken.id);
                // inject the user into the view. the 'user at the begining is the name of variable.
                // the second is the user details we got from the 'User' module
                res.locals.user = user;
                next();
            }
        });
    }
    else
    {
        // must pass the 'user' variable
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser }