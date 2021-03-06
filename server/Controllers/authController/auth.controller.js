const express = require('express');

// const asyncHandler = require('express-async-handler')
const passport=require('passport');
const router = express.Router();
const passportConf = require('../../Helpers/passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
// const fbAuth= passport.authenticate('facebookToken', { session: false });
// const fbAuth= passport.authenticate('facebook-token', { session: false });
// const googleAuth= passport.authenticate('google-token', { session: false });

const authService = require('./auth.service');
// const jwt = require('../helpers/jwt');
// routes

router.post('/register', register );

router.post('/authenticate',passportSignIn, authenticate);

router.get('/current', passportJWT, getCurrent);

router.get('/update', passportJWT, update);
router.get('/delete', passportJWT, _delete);
module.exports = router;






async function register(req, res, next) {
    console.log(req.body)
   await authService.create(req.body)
        .then(user => user ?
            res.status(201).json(user) 
             : res.status(400).json({
                message: ` Registeration Failed`
            }))
        .catch(err => {
            console.log(err)
            next(err)
        });
}

async function logout(req, res, next) {
    console.log(req.user)
req.logout();
if(!req.user){
    res.status(200).json({
        message: ` successfully logout`
    }) 
    
}else
res.status(400).json({
    message: `logout failed`
}) 
    

}




async function authenticate(req, res, next) {

    
    await authService.authenticate(req.user)
        .then(userData => userData ?
            res.json(userData) : res.status(400).json({
                message: 'Username or password is incorrect'
            }))
        .catch(err => next(err));
}




async function getCurrent(req, res, next) {
 await authService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}