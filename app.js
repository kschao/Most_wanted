"use strict"
// Koy Saechao

function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = unknownName(people);
      break;
  }
  console.log(searchResults);
  if(searchResults.length > 1){
    displayPeople(searchResults);
    app(people);
  }
  else{
    var placeHolder = searchResults[0];
    searchResults = placeHolder;
  mainMenu(searchResults, people);
  }
}
function unknownName(people){
  let searchType = promptFor("Do you know any of their traits? Enter 'yes or 'no'", yesNo).toLowerCase();
  let traitChoices = [];
    switch(searchType){
      case 'yes':
        traitChoices = searchByTrait(people);
      case 'no':
        break;
        default:
      app(people);
        break;
    }
    console.log(traitChoices);
    return traitChoices;
}
function mainMenu(person, people){


  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
      displayFamily(person);
    break;
    case "descendants":
      displayDescendants(person);
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
}

function searchByTrait(people){
  let search = promptFor("What trait would you like to search for? Enter: \n gender | eyes | height | weight | occupation \n or enter done if you've narrowed it down.", chars);
  let searchResults = [];
  switch (search) {
    case "gender":
      searchResults = searchByGender(people);
      people = searchResults;
      break;
    case "eyes":
      searchResults = searchByEyeColor(people);
      people = searchResults;
      break;
    case "height":
      searchResults = searchByHeight(people);
      people = searchResults;
      break;
    case "weight":
      searchResults = searchByHeight(people);
      people = searchResults;
      break;
    case "occupation":
      searchResults = searchByOccupation(people);
      people = searchResults;
    case "done":
      searchResults = people;
      console.log(people);
      return searchResults;
    default:
      return searchByTrait(people);
  }
  return searchByTrait(people);
}



function searchByGender(people){
  let gender = promptFor("Is the person you're looking for male or female?", chars);

  var foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);

  var foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByHeight(people){
  let height = promptFor("How tall are they?", chars);

  var foundPerson = people.filter(function(person){
    if(person.height === height){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByWeight(people){
  let weight = promptFor("How much does this person weigh?", chars);

  var foundPerson = people.filter(function(person){
    if(person.weight === weight){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("What does this person do for a living?", chars);

  var foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function getParents(person){
  let people = data;
  var theeParents = people.filter(function(parent){
    if(parent.id === person.parents[0]){
      return true;
    }
    else if(parent.id === person.parents[1]){
      return true;
    }
    else{
      return false;
    }
  })
  return theeParents;
}

function getDescendants(person){
  let people = data;
  var theeKids = people.filter(function(descendants){
    if(descendants.parents[0] === person.parents[0] || descendants.parents[0] === person.parents[1]){
      return true;
    }
    else if(descendants.parents[1] === person.parents[0] || descendants.parents[1] === person.parents[1]){
      return true;
    }
    else{
      return false;
    }
  }) 
  return theeKids;
}

function getSibling(person){
  let people = data;
  var theeSibs = people.filter(function(sibling){
    if(sibling.parents[0] === person.parents[0] || sibling.parents[0] === person.parents[1]){
      return true;
    }
    else if(sibling.parents[1] === person.parents[0] || sibling.parents[1] === person.parents[1]){
      return true;
    }
    else{
      return false;
    }
  }) 
  return theeSibs;
}

function getSpouse(person){
  let people = data;
  var theeSpouse = people.filter(function(spouse){
    if(spouse.id === person.currentSpouse){
      return true;
    }
    else{
      return false;
    }
  })
  var mySpouse = theeSpouse[0];
  return mySpouse;
}

function displayPerson(person){
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + '"' + "\n";
  personInfo += "Weight:" + person.weight + "lbs" + "\n";
  personInfo += "Age:" + person.dob + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Marital Status: " + getSpouse(person).firstName + " " + getSpouse(person).lastName + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}


function displayFamily(person){
  let familyInfo = "The whole family: " + "\n";
  let parents = getParents(person);
  let siblings = getSibling(person);
  for(let i = 0; i < parents.length; i ++){
    familyInfo += "Parent " + [i + 1]+ ": " + parents[i].firstName + " " + parents[i].lastName + "\n";
  }
  for(let i = 0; i < siblings.length; i++){
    familyInfo += "Sibling " + [i + 1]+ ": " + siblings[i].firstName + " " + siblings[i].lastName + "\n";
  }
  if(person.spouse != null){
    familyInfo += "Spouse: " + getSpouse(person).firstName + " " + getSpouse(person).lastName + "\n";
  }
  alert(familyInfo);
}

function displayDescendants(person){
  let familyInfo = person.firstName + "'s Descendants:" + "\n";
  let kids = getDescendants(person);
  for(let i = 0; i < kids.length; i++){
    familyInfo += kids[i].firstName + " " + kids[i].lastName + "\n";
  }
  alert(familyInfo);
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true;
}
}