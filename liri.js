require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var inputCommand = process.argv[2];

function concert_this() {
    console.log("concert_this() executed")
}

function spotify_this_song() {
    console.log("spotify_this_song() executed");
}

function movie_this() {
    console.log("movie_this() executed");
}

function do_what_it_says() {
    console.log("do_what_it_says() executed");
}

switch(inputCommand) {
    case "concert-this":
    concert_this();
    break;
    case "spotify-this-song":
    spotify_this_song();
    break;
    case "movie-this":
    movie_this();
    break;
    case "do-what-it-says":
    do_what_it_says();
    break;
}