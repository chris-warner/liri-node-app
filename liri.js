require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require('fs');
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
    var track = inputCommand2;
    var randomtrackSplit = [];
    if (track === undefined) {
        track = "What's my age again";
      }
    spotify
    .search({ type: 'track', query: track})
    .then(function(response) {
     var songdata = {
        artistName: response.tracks.items[0].artists[0].name,
        songName: response.tracks.items[0].name,
        previewLink: response.tracks.items[0].external_urls.spotify,
        album: response.tracks.items[0].album.name
     };
   console.log("---------------------------------------------------------------------");
   console.log("Artist: " + songdata.artistName);
   console.log("Song Name: " + songdata.songName);
   console.log("Preview Link: " + songdata.previewLink);
   console.log("Album: " + songdata.album);
   console.log("---------------------------------------------------------------------");
});

}

function movie_this() {
    if (movieTitle === undefined) {
        movieTitle = "Mr Nobody";
      }
    
      var urlHit =
        "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    
      axios.get(urlHit).then(
        function(response) {
          var jsonData = response.data;
    
          console.log("Title: " + jsonData.Title);
          console.log("Year: " + jsonData.Year);
          console.log("Rated: " + jsonData.Rated);
          console.log("IMDB Rating: " + jsonData.imdbRating);
          console.log("Country: " + jsonData.Country);
          console.log("Language: " + jsonData.Language);
          console.log("Plot: " + jsonData.Plot);
          console.log("Actors: " + jsonData.Actors);
          console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
      );
}

function do_what_it_says() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
    
        var dataArr = data.split(",");
    
        if (dataArr.length === 2) {
          pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
          pick(dataArr[0]);
        }
      });
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