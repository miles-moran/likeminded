var mongoose = require('mongoose');

// Genre Schema

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    artists: [{
        spotify_id: {
            type: String,
            required: false
        }
    }]
});

var artistSchema = mongoose.Schema({
    spotify_id: {
        type: String,
        required: true
    },
    users: [{
        id: {
            type: String,
            required: false
        }
    }]
});

var User = module.exports = mongoose.model('User', userSchema);

// Get Stylings
module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);
};

// Add Styling
module.exports.addUser = function(user, callback){
    User.create(user, callback);
};

// Edit Styling
module.exports.editUser = function(id, user, options, callback){
    var query = {_id: id};
    var update = {
        username: user.username,
        artists: user.artists
    }
    User.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteUser = function(id, callback){
    var query = {_id: id};
    User.remove(query, callback);
};
