import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
const firebaseConfig = {
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
const rating = document.querySelector(".rating");

const API_KEY = "60e1e8e7"; // API key

// Weather codes for mapping to custom icons


// Display the hourly forecast for the next 24 hours

const currentWeatherDiv = document.querySelector(".current-weather");
// Fetch and display weather details
const getMovieDetails = async (API_URL) => {
  window.innerWidth <= 768 && searchInput.blur();
  document.body.classList.remove("show-no-results");

  try {
    // Fetch weather data from the API and parse the response as JSON
    const response = await fetch(API_URL);
    const data = await response.json();
    const mtitle = data.Title;
    const mruntime = data.Runtime;
    const mdirector = data.Director;
    
    //console.log(data)
    console.log(mtitle);
    console.log(mruntime);
    console.log(mdirector);
    const tp = "by " + mdirector + ", running :" + mruntime;
    currentWeatherDiv.querySelector(".title").innerHTML = `${mtitle}`;
    currentWeatherDiv.querySelector(".description").innerHTML = `${tp}`;

    console.log("before");
    set(ref(db),{
      Title: mtitle,
      Runtime: mruntime,
      Director: mdirector,
      
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
    console.log("we in herere");
    //document.body.classList.add("show-no-results");
  }
}

// Set up the movie request
const setupWeatherRequest = (movieName) => {
  const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=60e1e8e7&t=${movieName}`;
  getMovieDetails(API_URL);
}

// Handle user input in the search box
searchInput.addEventListener("keyup", (e) => {
  const movieName = searchInput.value.trim();
  
  
  if (e.key == "Enter" && movieName) {
    setupWeatherRequest(movieName);
  }
});

rating.addEventListener("keyup", (e) => {
  const ratingvalue = rating.value.trim();
});

