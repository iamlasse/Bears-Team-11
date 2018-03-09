var Projects = require('../models/Projects');

var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()) {
		console.log('You are authorized to go to home page');
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	console.log('You are not authorized');
	res.redirect('/');
}

module.exports = function (passport) {

	/* GET login page. */
	router.get('/', function (req, res) {
		// Display the Login page with any flash message, if any
		res.send('Welcome to the index page');
	});

	/* GET Registration Page */
	router.get('/signup', function (req, res) {
		res.render('Welcome to the Register page');
	});

	/* Handle Registration POST */
	router.post('/signup', function(req, res, next) {
		passport.authenticate('signup', function(err, user, info) {
		  if (err) { return next(err); }
		  if (!user) { return res.send('No user'); }
		  return res.send('Success');
		})(req, res, next);
		});

	/* GET Home Page 
	 * This route is protected and if it is not authenticated,
	 * it will redirects to login page.
	*/
	router.get('/home', isAuthenticated, function (req, res) {
		res.send('Welcome to the Home');
	});


/* Handle Logout */
router.get('/signout', function (req, res) {
	req.logout();
	res.redirect('/');
});

return router;
}




