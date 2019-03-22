const config = require('../../Config/config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../Helpers/db');
const User = db.User;


module.exports = {
    authenticate,
    create,
    getById,
    update,
    delete: _delete
};

async function create(userParam) {
    // validate

    if (await User.findOne({
            "email": userParam.email
        })) {
        throw 'Email "' + userParam.email + '"  already exists';
    }

    const newUser = new User({
        
            email: userParam.email,
        
    });


    // hash password
    if (userParam.password) {
        newUser.password = bcrypt.hashSync(userParam.password, 10);
        delete userParam.password;

    }

    // save user
    let user=await newUser.save();

    // console.log(`${user}  new registered user`);


    // const {
    //     local: {   password },
    //     ...userWithoutPassword
    // } = user;
    user = user.toObject();

    delete user.password;

   



    const token = jwt.sign({
        sub: user.id
    }, config.JWT_SECRET)
    return {
        user,
        token,
    };
}


async function authenticate(user) {

    const token = jwt.sign({
        sub: user.id
    }, config.JWT_SECRET);


   
user= user.toObject();
delete user.password;
    return {
        user,
        token
    };
}




async function getById(id) {
    return await User.findById(id).select('-password');
}




// only be accessed by user itself and the admin
// to be implemented

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({
            email: userParam.email
        })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}


