var User = require('../models/website_user');
var KeystrokeDataModel = require('../models/keystrokes')
var jwt = require('jsonwebtoken');
var config = require('../../config');
var superSecret = config.secret; // super secret for creating tokens

module.exports = function(app, express) {

    var apiRouter = express.Router();

    // route to authenticate a user (POST http://localhost:8081/api/authenticate)
    apiRouter.post('/authenticate', function(req, res) {
        // find the user
        // select the name username and password explicitly
        User.findOne({
            username: req.body.username
        }).select('username firstname lastname password date').exec(function(err, user) {
            if (err) throw err; // no user with that username was found
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password); // check if password matches
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({
                        username: user.username
                    }, superSecret, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours 5 //
                    });
                    console.log(jwt.decode(token));
                    // return the information including token as JSON
                    console.log(user);
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        // epishs epestrepse pisw kai ta info tou xristi
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        _id: user._id,
                        date: user.date
                    });
                }
            }
        });
    });


    // middleware to use for all requests
    // route middleware to verify a token
    apiRouter.use(function(req, res, next) {

        console.log('Somebody just came to our app!'); // do logging

        //check if user wants to register so avoid middleware
        if ((req.path != '/users') || (req.method != 'POST')) {

            // check header or url parameters or post parameters for token
            var token = req.body.token || req.param('token') || req.headers['x-access-token'];
            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, superSecret, function(err, decoded) {
                    if (err) {
                        console.log('Failed to auth token');
                        res.json({
                            success: false,
                            message: 'Failed to authenticate token',
                            val: 'failtok'
                        });
                        return;
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                // if there is no token
                // return an HTTP response of 403 (access forbidden) and an error message
                console.log('No token provided.');
                res.json({
                    success: false,
                    message: 'No token provided.',
                    val: 'notok'
                });

            }
        } else {
            console.log('User wants to register');
            next();
        }

    });

    // test route to m/ake sure everything is working
    // (accessed at GET http://localhost:8080/api)
    apiRouter.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
        console.log(req.headers);
        console.log(req.ip);
    });


    // more routes for our API will happen here
    // REGISTER OUR ROUTES -------------------------------
    // on routes that end in /users
    // ----------------------------------------------------
    apiRouter.route('/users')
        // create a user (accessed at POST http://localhost:8080/api/users)
        .post(function(req, res) {
            // create a new instance of the User model
            var user = new User();
            // set the users information (comes from the request)
            user.name = req.body.name;
            user.username = req.body.username;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.password = req.body.password;
            // save the user and check for errors
            user.save(function(err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A user with that username already exists. ' });
                    else
                        return res.send(err);
                }
                res.json({ success: true, message: 'User created!' });
            });
        })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) res.send(err);
            // return the users
            res.json(users);
        });
    });


    // on routes that end in /users/:user_id
    // ----------------------------------------------------
    apiRouter.route('/users/:user_id')
        // get the user with that id
        // (accessed at GET http://localhost:8080/api/users/:user_id)
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                // console.log(req.params.user_id);
                if (err) res.send(err);
                // return that user
                console.log('response from server');
                console.log(JSON.stringify(user))
                res.json(user);
            });
        })

    // update the user with this id
    // (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {
        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err) res.send(err);
            // update the users info only if its new
            console.log(req.body.name);
            if (req.body.firstname) user.firstname = req.body.firstname;
            if (req.body.lastname) user.lastname = req.body.lastname;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;

            // save the user
            user.save(function(err) {
                if (err) res.send(err);
                // return a message
                res.json({ success: true, message: 'User updated!' });
            });
        });
    })

    // delete the user with this id
    // (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });





    return apiRouter;
};
