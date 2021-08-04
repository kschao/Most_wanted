"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  if (searchResults.length === 1) {
    mainMenu(searchResults[0], people);

  } else {
    for (let i = 0; i < searchResults.length; i++) {
      displayPerson(searchResults[i]);
    }
  }
}
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let searchByEyeColor = promptFor("Enter an eye color: brown, hazel, black, blue, green", autoValid);
  let foundEyeColor = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === searchByEyeColor) {
      return true;
    } else {
      return false;
    }
  });
  return foundEyeColor;
}

//TODO: add other trait filter functions here.
function searchByGender(people) {
  let genderSelection = promptFor("Enter Female or Male", autoValid);
  let foundGender = people.filter(function (possibleMatch) {
    if (possibleMatch.gender === genderSelection) {
      return true;
    } else {
      return false;
    }
  });
  return foundGender;
}
 function searchByBirthday(people) {
   let dobSelect = promptFor("Enter Date of Birth for of mm/dd/yy or m/dd/yyyy", autoValid);
   let foundDOB = people.filter(function (possibleMatch) {
     if (possibleMatch.dob === dobSelect) {
          return true;
   } else {
     return false;
   }
   });
   return foundDOB;
  }

function searchHeight(people) {
  let heightSelection = promptFor("Enter heighy in inches", autoValid);
  let heightFound = people.filter(function (possibleMatch){
    if (possibleMatch.height === heightSelection) {
      return true;
    } else {
      return false;
    }
  });
  return heightFound;
}
function searchByWeight(people) {
  let weightSelection = promptFor("Enter weight in lbs. (pounds)", autoValid);
  let weightFound = people.filter(function (possibleMatch) {
    if (possibleMatch.weight === weightSelection) {
      return true;
    } else {
      return false;
    }
  });
  return weightFound;
}

function searchOccupation(people) {
  let occupantSelection = promptFor("Enter Occupation", autoValid);
  let occupationFound = people.filter(function (possibleMatch) {
    if (possibleMatch.occupation === occupantSelection) {
      return true;
    } else {
      return false;
    }
  });
  return occupationFound;
}

function searchById(people) {
  let idSelection = promptFor("Enter Id Number")

  let foundId = people.filter(function (possibleMatch) {
    if (possibleMatch.id === idSelection) {
      return true;
    } else {
      return false;
    }
  });
  return foundId;
}

function searchParents(people) {
  let foundParents = people.filter(function (person) {
    if (person.parents[0] == person.parents[0] || person.parents[0] == person.parents[1]) {
      return true
    }
    else if ((person.parents[0] == person.parents[0] || person.parents[0] == person.parents[1]) || (person.parents[1] == person.parents[0] || person.parent[1] == person.parent[1])) {
      return true
    }
  });
  return foundParents;
}

function searchByCurrentSpouse(people) {

  let foundSpouse = people.filter(function (person) {
    if (person.currentSpouse == person.ID) {
      return true;
    } else {
      return false;
    }
  });
  return foundSpouse;
}

function searchTrait(people) {
  let searchType = promptFor("What trait do you want to search for? ' gender' , 'dob' , 'height' , 'weight' , 'eyeColor' , 'occupation' , 'id' , 'parents' , 'spouse'. If more then type multi ", autoValid);
  let searchResults

  switch (searchType) {
    case "gender":
      searchResults = searchByGender(people);
      break;
    case "dob":
      searchResults = searchByDOB(people);
      break;
    case "height":
      searchResults = searchHeight(people);
      break;
    case "weight":
      searchResults = searchByWeight(people);
      break;
    case "eyeColor":
      searchResults = searchByEyeColor(people);
      break;
    case "occupation":
      searchResults = searchOccupation(people);
      break;
    case "id":
      searchResults = searchById(people);
      break;
    case "parents":
      searchResults = searchParents(people);
      break;
    case "spouse":
      searchResults = searchByCurrentSpouse(people);
      break;
    case "multi":
      searchResults = searchByMultipleTraits(people);
      break;
  }
  return searchResults;
}


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){

  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parent(s) " + person.parents + "\n";
  personInfo += "Current Spouse " + person.currentSpouse + "\n";

  alert(personInfo);
}

//#endregion

function displaySibling(myPeople, people) {
  let foundSiblings = people.filter(function (person) {
    for (let i =0; i < people.length; i++) {
      if (myPeople.parents[i] === myPeople.parents) {
        console.log(person.id);
        return true;
      }
    }
  });
  return foundSiblings;
}

function displayChildren(people) {
  let foundChildren = people.filter(function (person) {
    if (person.parent[0] === person.id || person.parent[1] === person.id) {
      console.log(person.id);
      return true;
    }
  });
  return foundChildren;
}

function displayDescendants(myPeople, people) {

  let personFound = people.filter(function (person) {
    if (person.parents[0] === myPeople.id || person.parents[1] === myPeople.id) {
      console.log(myPeople.id);
      return true;
    } else {
      return false;
    }
  });
  displayPeople(personF);
}
//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let response;
  let isValid;
  do{
    response = prompt(question).trim();
    isValid = valid(response);
    while (!response || !valid(response));
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}
// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidEyeColor(input) {
  if (input.toLowerCase === "blue") {
    return true;
  } else if (input.toLowerCase === "hazel") {
    return true;
  } else if (input.toLowerCase === "green") {
    return true;
  } else if (input.toLowerCase === "brown") {
    return true;
  } else if (input.toLowerCase === "black") {
    return true;
  } else {
    return false;
  }
} 

