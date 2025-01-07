import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
var firebaseConfig = {
  apiKey: "AIzaSyDqRsgbiUdtmvkA8l0xg1YHo234rZGjctY",
  authDomain: "movie-database-80fc8.firebaseapp.com",
  databaseURL: "https://movie-database-80fc8-default-rtdb.firebaseio.com",
  projectId: "movie-database-80fc8",
  storageBucket: "movie-database-80fc8.firebasestorage.app",
  messagingSenderId: "398555772218",
  appId: "1:398555772218:web:fae30f63ed1fdc0d628c03",
  measurementId: "G-JX16E7W4BY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// end firebase

import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"
const db = getDatabase();


const searchInput = document.querySelector(".search-input");
const rating = document.querySelector(".search-input-rating");
const type = document.querySelector(".search-input-type");
const API_KEY = "60e1e8e7"; // API key

// Weather codes for mapping to custom icons


// Display the hourly forecast for the next 24 hours

const currentWeatherDiv = document.querySelector(".current-weather");
// Fetch and display weather details
const getMovieDetails = async (API_URL, ratingValue, typeValue) => {
  window.innerWidth <= 768 && searchInput.blur();
  document.body.classList.remove("show-no-results");

  try {
    // Fetch weather data from the API and parse the response as JSON
    const response = await fetch(API_URL);
    const data = await response.json();
    const mtitle = data.Title;
    const mruntime = data.Runtime;
    const mdirector = data.Director;
    const mrelease = data.Released;
    const mimdb = data.imdbID;
    console.log(data);
    //console.log(data)
    console.log(mtitle);
    console.log(mruntime);
    console.log(mdirector);
    const tp = "by " + mdirector + ", running :" + mruntime;
    currentWeatherDiv.querySelector(".title").innerHTML = `${mtitle}`;
    currentWeatherDiv.querySelector(".description").innerHTML = `${tp}`;

    console.log("before");
    set(ref(db, 'movie/' + movieName),{
      Title: mtitle,
      Runtime: mruntime,
      Director: mdirector,
      Released: mrelease,
      IMDB : mimdb,
      Rating: parseInt(ratingValue),
      Wish: parseInt(typeValue)
      
  })
  .then(()=>{
    //currentWeatherDiv.querySelector(".title").innerHTML = `${mtitle}`;
    //currentWeatherDiv.querySelector(".description").innerHTML = `${tp}`;
    
  })
  .catch((error)=>{
      alert(error);
  });
    const movieInfo = '{' + title + '},' + '{' +runtime +'},' + '{' + director+ '}';
    console.log(movieInfo);
  } catch (error) {
    
    //document.body.classList.add("show-no-results");
  }
}

// Set up the movie request
const setupWeatherRequest = (movieName, ratingValue, typeValue) => {
  console.log(typeValue);
  // you need to resume from here. completed getting type value till here. now figure out how to call different database.
  const doubt = movieName[0]+movieName[1]; // if doubt is "tt" then buddy it is IMDB token.
  
  var API_URL;
  if(doubt == "tt"){
    //
     API_URL = `https://www.omdbapi.com/?apikey=60e1e8e7&i=${movieName}`;
  }
  else{
   API_URL = `https://www.omdbapi.com/?apikey=60e1e8e7&t=${movieName}`;
  }
  //http://www.omdbapi.com/?i=tt6033368
  console.log(API_URL);
  getMovieDetails(API_URL, ratingValue, typeValue);
}


var check1 = false;
var check2 = false;
var check3 = false;
var movieName;
var ratingValue;

// Handle user input in the search box
searchInput.addEventListener("keyup", (e) => {
  movieName = searchInput.value.trim();

  
  if (e.key == "Enter" && movieName) {
    check1 = true;
    console.log("check1");
  }
});

rating.addEventListener("keyup", (e) => {
  ratingValue = rating.value.trim();

  
  if (e.key == "Enter" && ratingValue) {
    console.log("check2");
    check2 = true;

    
  }
});

type.addEventListener("keyup", (e) => {
  const typeValue = type.value.trim();
  if(e.key == "Enter" && typeValue){
    console.log("check3");
    check3=true;


    if( check1 && check2 ){
      //console.log("movie name: ");
      //console.log(searchInput.value.trim());
      //console.log(movieName);
      //console.log("herer in check1 check2");
      //console.log(rating.value.trim());
      //console.log(typeValue);
      setupWeatherRequest(movieName, ratingValue, typeValue);
    }
  }


});



