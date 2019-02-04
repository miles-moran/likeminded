const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Allows us to access remotely through Angular
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.use(bodyParser.json());

Users = require('./models/user');
Artists = require('./models/artist');

mongoose.connect('mongodb://localhost/likeminded');
let db = mongoose.connection;

app.get('/', function(req, res){
    res.send("Refer to /api/likeminded");  
});

app.get('/api/likeminded/users', function(req, res){
    Users.getUsers(function(err, users){
        if(err){
            throw error;
        }
        res.json(users);
    });
});

app.post('/api/likeminded/users', function(req, res){
    var user = req.body;
    Users.addUser(user, function(err, user){
        if(err){
            throw error;
        }
        res.json(user);
    });
});

app.put('/api/likeminded/users/:_id', function(req, res){
    var id = req.params._id;
    var user = req.body;
    Users.editUser(id, user, {}, function(err, user){
        if(err){
            throw error;
        }
        res.json(user);
    });
});

app.delete('/api/likeminded/users/:_id', function(req, res){
    var id = req.params._id;
    Users.deleteUser(id, function(err, user){
        if(err){
            throw error;
        }
        res.json(user);
    });
});
//ARTISTS
app.get('/api/likeminded/artists', function(req, res){
    Artists.getArtists(function(err, artists){
        if(err){
            throw error;
        }
        res.json(artists);
    });
});

app.post('/api/likeminded/artists', function(req, res){
    var artist = req.body;
    Artists.addArtist(artist, function(err, artist){
        if(err){
            throw error;
        }
        res.json(artist);
    });
});

app.put('/api/likeminded/artists/:_id', function(req, res){
    var id = req.params._id;
    var artist = req.body;
    Artists.editArtist(id, artist, {}, function(err, artist){
        if(err){
            throw error;
        }
        res.json(artist);
    });
});

app.delete('/api/likeminded/artists/:_id', function(req, res){
    var id = req.params._id;
    Artists.deleteArtist(id, function(err, artist){
        if(err){
            throw error;
        }
        res.json(artist);
    });
});

app.listen(3000);
console.log('Running on port 3000');