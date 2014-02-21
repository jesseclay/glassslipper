
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

// Routes
var index = require('./routes/index');
var login = require('./routes/login');
var result = require('./routes/result');
var history = require('./routes/history');
var favorites = require('./routes/favorites');
var addShoe = require('./routes/addShoe');  
var about = require('./routes/about');
var login = require('./routes/login'); 
var logout = require('./routes/logout'); 
var signup = require('./routes/signup'); 

// Database
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var models = require('./models');
var flash = require('connect-flash'); 

// User Login & Password
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	{usernameField: 'email',
  passwordField: 'password'},
  function(email, password, done) {
    // search for user in DB
    User = models.user;
    User.findOne({ "email": email }, function(err, user) {
      var hash = bcrypt.hashSync(password);
      if (user) {
        // valid email entered, check password
        if (!bcrypt.compareSync(password, hash)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }
      if (err) { return done(err); }
      // if no user with that email then create a new user
      if (!user) {
        var hashedPassword = bcrypt.hashSync(password);
      	newUser = new User({"email": email, "passwordHash": hashedPassword});
        newUser.save(function(err) {
        if(err) {
        	console.log(err);
        } else {
          return done(null, newUser, { message: 'Account Created!' });
         }
      });
      }
    });
  }
));

// checks the user entered password against the salted and hashed password

// function checkPassword(user, password) {
// 	bcrypt.compare(password, user.password, function(err, res) {
//     return res; // res returns correct password or incorrect password
//   });
// }

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session());
app.use(flash()); 
app.use(express.logger());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.bodyParser());

handlebars.create({
	helpers: {
		defaultSize: function() {
			//if (size == 7) {
        	//	return true;
    		//}
    		return true;		
		}
	}
});

//passsport stuff 
//var Account = require('./models/account');
//passport.use(new LocalStrategy(Account.authenticate()));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());


//mongoose 
var local_uri = 'mongodb://localhost/glassslipper'; 
var database_uri = process.env.MONGOLAB_URI || local_uri; 
mongoose.connect(database_uri);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.landing);
app.post('/', index.postAddShoe); 
app.get('/login', login.view);
app.get('/search', index.search);
app.get('/result', result.result);
app.get('/history', history.view);
app.get('/favorites', favorites.view); 
app.get('/about', about.view);
app.get('/addShoe', addShoe.view);
app.get('/signup', signup.view); 
app.get('/logout', logout.logout);

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
app.post('/result', result.addToFavs);


function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}

// app.get('/test', test.view);
// app.get('/project/:name/:image_url', project.viewProject);
// Example route
// app.get('/users', user.list);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
