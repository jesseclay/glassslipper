// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User       		= require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {  

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        var brand = req.body.brand;
        var size = req.body.size;
        var image = req.body.image;
        console.log("The Brand is: "+ brand); 

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

				// if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                if (brand) {
                    newUser.favorite_shoes.push({'brand': brand, 'size': size, 'image_url': image});  
                }
				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
         //console.log("The request is: "+ req.query); 
         console.log("running local-login! :)");
         var brand = req.body.brandToFind;
         var size = req.body.sizeResult;
         var image = req.body.image;
         //console.log("brand is: " + brand);
         //console.log("size is: " + size);
         //console.log("image is: " + image);
          User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            if(brand) {
                User.update({'local.email': email} , { $push: { 'favorite_shoes': { 'brand': brand, 'size': size, 'image_url': image}}} , function(error) {
                if (error) return error;   
                console.log('Added %s with size=%s', brand, size);
            }); 
            }
            return done(null, user);
        });

    }));

};



// passport.use(new LocalStrategy(
//     {usernameField: 'email',
//   passwordField: 'password'},
//   function(email, password, done) {
//     // search for user in DB
//     User = models.user;
//     User.findOne({ "email": email }, function(err, user) {
//       var hash = bcrypt.hashSync(password);
//       if (user) {
//         // valid email entered, check password
//         if (!bcrypt.compareSync(password, hash)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       }
//       if (err) { return done(err); }
//       // if no user with that email then create a new user
//       if (!user) {
//         var hashedPassword = bcrypt.hashSync(password);
//         newUser = new User({"email": email, "passwordHash": hashedPassword});
//         newUser.save(function(err) {
//         if(err) {
//             console.log(err);
//         } else {
//           return done(null, newUser, { message: 'Account Created!' });
//          }
//       });
//       }
//     });
//   }
// ));