var mongoose = require('mongoose');

// Genre Schema

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

var Artist = module.exports = mongoose.model('Artist', artistSchema);

// Get Stylings
module.exports.getArtists = function(callback, limit){
    Artist.find(callback).limit(limit);
};

// Add Styling
module.exports.addArtist = function(artist, callback){
    Artist.create(artist, callback);
};

// Edit Styling
module.exports.editArtist = function(id, artist, options, callback){
    var query = {_id: id};
    var update = {
        spotify_id: artist.spotify_id,
        users: artist.users
    }
    Artist.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteArtist = function(id, callback){
    var query = {_id: id};
    Artist.remove(query, callback);
};
