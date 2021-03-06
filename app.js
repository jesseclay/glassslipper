/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var User = require('./models/user');

var index = require('./routes/index');
var login = require('./routes/login');
var result = require('./routes/result');
var history = require('./routes/history');
var favorites = require('./routes/favorites');
var addShoe = require('./routes/addShoe');  
var about = require('./routes/about');

// Example route
// var user = require('./routes/user');
var mongoose = require('mongoose');
var configDB = require('./config/database.js'); 
var flash = require('connect-flash'); 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var login= require('./routes/login'); 
var logout = require('./routes/logout'); 
var signup = require('./routes/signup'); 

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
app.get('/alternateSearch', index.alternateSearch); 
app.get('/result', result.result);
app.get('/alternateResult', result.alternateResult);
app.get('/history', history.view);
/*app.get('/favorites', isLoggedIn, function(req, res) {
    res.render('favorites.handlebars', {
      user : req.user // get the user out of session and pass to template
    });
  });*/
app.get('/favorites', favorites.view); 
app.post('/favorites', favorites.addToFavs); 
app.get('/about', about.view);
app.get('/addShoe', addShoe.view);
app.get('/signup', signup.view); 
app.get('/logout', logout.logout); 
app.post('/signup', signup.sendData); 
app.post('/login', login.sendData); 
// =======
// app.get('/signup', signup.view); 
// app.get('/logout', logout.logout);

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );
// app.post('/result', result.addToFavs);



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
