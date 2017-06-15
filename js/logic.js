$(document).ready(function () {

$("#app").hide();

// Local VAR

// var user = "";
var firebaseUser = firebase.auth().onAuthStateChanged;
console.log(firebaseUser , "Not sure if this is getting the firebaseUser")

// Function to display app once the user has logged in of signed up
function displayApp() {
  firebase.auth().onAuthStateChanged(function (user) {
      if( user = firebaseUser){
      $("app").show();
    }else{
       $("#app").hide();
    }
  })
  }

  displayApp();

//banner
  $('.parallax').parallax();

  // Nurtrition facts
  $('#test1').nutritionLabel({'showLegacyVersion' : false});
  
});


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_dppV69T8GUcG9kD-n4tW4rIsr8wdtoY",
    authDomain: "eat-and-burn-fe13e.firebaseapp.com",
    databaseURL: "https://eat-and-burn-fe13e.firebaseio.com",
    projectId: "eat-and-burn-fe13e",
    storageBucket: "eat-and-burn-fe13e.appspot.com",
    messagingSenderId: "161262025291"
  };
  firebase.initializeApp(config);

  

const txtPassword = document.getElementById("txtPassword");
const txtEmail = document.getElementById("txtEmail");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");

// Login Event

btnLogin.addEventListener("click", e=>{

  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message)); 
});

// signup event

btnSignup.addEventListener("click", e=>{

  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message)); 

});

//log Out

btnLogout.addEventListener("click", e=>{
  firebase.auth().signOut();
})


// test - show app//

// btnLogin.addEventListener("click", e=>{

//   if(firebaseUser){
//         $("app").show();
//     }else{
//        $("#app").hide();
//     }
// })


// realtime listener

firebase.auth().onAuthStateChanged( firebaseUser => {
  if(firebaseUser){
    console.log(firebaseUser)
    btnLogout.classList.remove("hide");
    //  $("app").show();

  } else {console.log(" Not logged in.") 
    btnLogout.classList.add("hide");
    //  $("#app").hide();
  }

// function displayApp() {

//     if( user = firebaseUser){
//       $("app").show();
//     }else{
//        $("#app").hide();
//     }
//   }

//   displayApp();

})


// -API ---------------------//

$("#download-button").on("click", function (event) {
  event.preventDefault();
  var input = $("#user-input").val().trim();
  var urlQuery = "http://api.nutritionix.com/v1_1/search/" + input + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=bb482bd0&appKey=c8db65a3dc0de939c5e49ed465a37e6b"


  // FIRST URL//   "http://api.nutritionix.com/v1_1/search/" + input + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=bb482bd0&appKey=c8db65a3dc0de939c5e49ed465a37e6b"

  $.ajax({
    url: urlQuery,
    method: "GET"
  })
    .done(function (response) {
      console.log(response)
      // $("#display").empty();

      var results = response.hits[0];
      var calories = results.fields.nf_calories;
      var servings = results.fields.nf_serving_size_qty;
      var totalFat = results.fields.nf_total_fat;
      var itemName = results.fields.brand_name;



      console.log(results)
    $('#test1').nutritionLabel({
      'showServingUnitQuantity' : false,
	'itemName' : input,
	'ingredientList' : 'Bleu Cheese Dressing',

	'decimalPlacesForQuantityTextbox' : 2,
	'valueServingUnitQuantity' : 1,

	'allowFDARounding' : true,
	'decimalPlacesForNutrition' : 2,

	'showPolyFat' : false,
	'showMonoFat' : false,

	'valueCalories' : calories,
	
	'valueAddedSugars' : 17,
    });
      

      console.log(calories, "we made it!")
      console.log(servings, "serve!")
      console.log(totalFat, "fat!")
      console.log(itemName, "name!")

      // $("#display").append("<h2>calories: ", calories + "</h2>");

      $("#display-calories").html(calories + " Calories");
      $("#user-input-display").html(input);

      // Displaying more data

      $("#itemName").html(itemName);
      $("#serv").html("Servings: " + servings);
      $("#fat").html("Fat: " + totalFat);

    })
})