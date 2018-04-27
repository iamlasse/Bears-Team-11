/* 
 * SignUp functionality to the user using Local Strategy
 * First checks if the email or username already regestered in the DB,
 * Creates an user in the DB with user credentials 
 * We are hashig password using bcrypt-nodejs to make it secure
*/
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users');
var bCrypt = require('bcrypt-nodejs');
var UserDetails = require('../models/UserDetails');

module.exports = function(passport) {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password,
        // we should override with email if we want to override it.
        usernameField: 'email',
        passwordField: 'password',
        // allows us to pass back the entire request to the callback
        passReqToCallback: true
      },
      function(req, username, password, done) {
        findOrCreateUser = function() {
          // find a user in Mongo with provided username and email
          User.findOne(
            { $or: [{ email: username }, { username: req.body.username }] },
            function(err, user) {
              // In case of any error, return using the done method
              if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
              }
              // already exists
              if (user) {
                console.log('User already exists with this email or username');
                return done(null, false, {
                  message: 'User already exists with this email or username'
                });
              } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.username = req.body.username;
                newUser.password = createHash(password);
                newUser.email = username;
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;

                // save the user
                newUser.save(function(err) {
                  if (err) {
                    console.log('Error in Saving user: ' + err);
                    throw err;
                  }
                  // save newUserDetails
                  var newUserDetails = new UserDetails({
                    _id: newUser._id,
                    username: newUser.username
                  });
                  newUserDetails.save(function(err, userDetail) {
                    if (err) {
                      console.log('Error in saving newUserDetails: ' + err);
                      throw err;
                    }
                    console.log('New UserDetails document available');
                  });
                  console.log('User Registration succesful');
                  return done(null, newUser, {
                    message: 'User Registration Succesful'
                  });
                });
              }
            }
          );
        };
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(findOrCreateUser);
      }
    )
  );

  // Generates hash using bCrypt
  var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
