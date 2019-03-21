require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var inputCommand = process.argv[2];
var inputCommand2 = process.argv[3];

function concert_this() {
    console.log("concert_this() executed");
    var artist = inputCommand2;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
    for(var i = 0; i < response.data.length; i++) {
    var show = {
        name: response.data[i].venue.name,
        location: response.data[i].venue.city + ", " + response.data[i].venue.country,
        date: moment(response.data[i].datetime).format('MM-DD-YYYY')
    };
    console.log("("+(i+1)+")" + "------------------------------------------------------------------");
    console.log("Name of Venue: " + show.name);
    console.log("Location: " + show.location);
    console.log("Date of Event: " + show.date);
    console.log("---------------------------------------------------------------------");
    }
  }
);
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