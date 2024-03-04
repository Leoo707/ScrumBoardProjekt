let highestCardNum = 0;
let divvidivIds = [];
let body = document.body;

let versionButton = document.getElementById('version-button');
let version = document.getElementById('version');
let showVersion = document.getElementById('showVersion');

showVersion.addEventListener('click', (ev) => {
  ev.preventDefault();
  version.style.display = "flex";
})

//skiddadle skidoodle popUp Version window now gone!
versionButton.addEventListener('click', (ev) => {
  ev.preventDefault();
  version.style.display = 'none';
})

//create the rows and columns for the drop areas
function createDragAndDropDivs() {
  let p = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let divvidiv = document.createElement('div');

      divvidiv.className = 'dragDiv';
      divvidiv.id = 'divvidiv' + p++;
      divvidiv.allowDrop = true;
      
      divvidiv.addEventListener('dragover', (event) => {
        if (divvidiv.childNodes.length == 0) {
          event.preventDefault();
        }
      });

      divvidiv.addEventListener('dragenter', (event) => {
        event.preventDefault();
      });

      divvidiv.addEventListener('drop', (event) => {
        event.preventDefault();
        let pos = divvidiv.id.slice(8);
        if (divvidivFilled) {
          savePos(pos, draggedCard);
        } 
      });

      divvidivIds.push(divvidiv.id);

      document.getElementById('cards').appendChild(divvidiv);
    }
  }
}

createDragAndDropDivs();

//
function allowDrop(ev) {
  ev.preventDefault();
}

//dragged card = the latest clicked element 
function drag(ev) {
  draggedCard = ev.srcElement;
}

//let define us our values which we will need to say later, what the content of the card contains! 
var activeCard = undefined;
var cardValues = {};
var selectedColor = undefined;
var draggedCard = undefined;
var activeColor = undefined;
const addButton = document.getElementById('addDiv');
const cardSection = document.getElementById('cards');
let count = 0;
var ignoreAutoMove = true;

//our 3 colors, red, yellow and green!
const color1 = document.getElementById("green");

color1.addEventListener("click", (ev) => {
    ev.preventDefault();
    selectedColor = "#00ff00";
    onColorChange(color1);
});

const color2 = document.getElementById("yellow");

color2.addEventListener("click", (ev) => {
    ev.preventDefault();
    selectedColor = "#FFFF00";
  	onColorChange(color2);
});

const color3 = document.getElementById("red");

color3.addEventListener("click", (ev) => {
    ev.preventDefault();
    selectedColor = "#FF0000";
    onColorChange(color3);
});
//say that the active color isnt longer undefined! 
function onColorChange(color) {
  if (activeColor) {
    console.log("activeColor= " + activeColor);
    activeColor.style.boxShadow = ""; 
  } 
  activeColor = color;
  activeColor.style.boxShadow = "2px 2px 10px #4b4b4b" 
}
//Function to show the pop-up window if the edit button is clicked
function editButtonPopUp(cardNum) {
  activeCard = cardNum;
  var popUp = document.getElementById('pop-up-window');
  popUp.style.display = "block";
}
//Get the title from the card that is currently in edit mode.
function getTitle() {
  let title = document.getElementById('title');
  return title.value;
}
//Get the Category from the card that is currently in edit mode.
function getCategory() {
  let category = document.getElementById('category');
  return category.value;
}
//the rest should be clear!
function getDetails() {
  let details = document.getElementById('details');
  return details.value;
}
function getReport() {
  let report = document.getElementById('report');
  return report.value;
}
function getFile() {
  let file = document.getElementById('file');
  return file.value;
}
//...adds a card? And creates it!
function addCard(storedCard) {
  document.getElementById('pop-up-window').style.display = 'none';
  let card = document.createElement('div'); 
  card.draggable = true;
  card.ondragstart = drag;
  card.className = 'card';
  let cardColor = document.createElement('div');
  cardColor.className = 'card-img-top ' + highestCardNum;
  let cardBody = document.createElement('div');
  cardBody.className = 'cardBody';
  let cardHeadline = document.createElement('h5');
  cardHeadline.class = 'cardTitle';
  cardHeadline.id = 'cardHeadline' + highestCardNum;
  cardHeadline.innerHTML = 'Title';
  let cardEdit = document.createElement('button');
  cardEdit.style.borderRadius = '10px';
  cardEdit.style.border = "0";
  // cardEdit.class = 'cardButton';

  let cardCategory = document.createElement('p'); 
  cardEdit.addEventListener('click', function () {
    editButtonPopUp(card.id);
  //Straßenbande
  });
  cardCategory.class = 'card-text';
  cardCategory.id = 'cardCategory' + highestCardNum;
  cardCategory.innerHTML = 'Infos';
  cardEdit.innerHTML = 'Edit';

  cardBody.append(cardHeadline);
  cardBody.append(cardCategory);
  cardBody.append(cardEdit);

  card.append(cardColor);
  card.append(cardBody);

  if (!storedCard) {
    card.id = 'card' + highestCardNum++;
  } else {
    card.id = 'card' + storedCard.id;
    cardHeadline.innerHTML = storedCard.title;
    cardCategory.innerHTML = storedCard.category;
    cardColor.style.backgroundColor = storedCard.color;
    highestCardNum++;
  }

  if (document.querySelectorAll('.card').length >= 3) {
    addDragDivRow();
  }

  cardSection.appendChild(card);

  if (card.parentElement == 1) {
    card.parentElement.appendChild(card);
  }

  if (!ignoreAutoMove) {
    autoMoveCard(card);
  } else {
    savePos(storedCard.position, card);
  }
}

addButton.addEventListener('click', (evt) => {
  addCard();
});

var p = 9;
let parentDiv = null;

//add a div row, when u add a card.
function addDragDivRow() {
  for (let c = 0; c < 3; c++) {
    let divvidiv = document.createElement('div');

    divvidiv.className = 'dragDiv';
    divvidiv.id = 'divvidiv' + p++;
    divvidiv.allowDrop = true;

    divvidiv.addEventListener('dragover', (event) => {
      if (divvidiv.childNodes.length == 0) {
        event.preventDefault();
      }
    });

    divvidiv.addEventListener('dragenter', (event) => {
      event.preventDefault();
    });

    divvidiv.addEventListener('drop', (event) => {
      event.preventDefault();
      divvidiv.appendChild(draggedCard);
    });

    document.getElementById('cards').appendChild(divvidiv);

    divvidivIds.push(divvidiv.id);

    console.log(divvidivIds);

    parentDiv = divvidiv.parentNode;
  }
}

//delete a div row
function deleteDDR() {
  p--;
  for (let index = 0; index < 2; index++) {
    document.getElementById('divvidiv' + p--).remove();
  }
  p++;
}

let deleteArea = document.getElementById('trash');

deleteArea.addEventListener('dragover', function (event) {
  event.preventDefault();
});

deleteArea.addEventListener('drop', function (event) {
  event.preventDefault();
  deleteCards();

  let cardId = draggedCard.id.slice(4);
 
  console.log("Die gelöschte Karte ist: " + cardId);

  deleteData(
    cardId,
  );
});

//delete the cards?
function deleteCards() {
  const answer = confirm('Möchten Sie diese Karte endgültig löschen?');
  if (answer) {
    console.log('Element deleted!');
    // Hier Check ob ganze Reihe leer ist; nichts in bspw. divvidiv9, divvidiv10 & divvidiv11
    deleteDDR();
    draggedCard.parentElement.removeChild(draggedCard);
  } else {
    console.log('Dann halt nicht :(');
  }
}
//as the name says, let's clear the pop-up window!
function saveThatShit() {
  // document.getElementById('title').value = data[1];
  // document.getElementById('category').value = data[2];
  // document.getElementById('details').value = data[4];
  // document.getElementById('report').value = data[5];

  // console.log(data[1, 2, 4, 5]);

}  
let data = [];
//This function will save the parameters for each Card!
function onSave() {
 
  
  let card = document.getElementById(activeCard);

  let dropDiv = card.parentElement.id;

  document.getElementById('pop-up-window').style.display = null;

  cardValues[activeCard] = {};
  cardValues[activeCard]['details'] = getDetails();

  card.childNodes[0].style.backgroundColor = selectedColor;
  card.childNodes[1].children[0].innerHTML = getTitle();
  card.childNodes[1].children[1].innerHTML = getCategory();

  let cardId = card.id.slice(4);
  let title = document.getElementById('title').value;
  let category = document.getElementById('category').value;
  let color = selectedColor;
  let details = document.getElementById('details').value;
  let internshipReport = document.getElementById('report').value;
  let file = document.getElementById('file').value;
  let position = dropDiv.slice(8);

  console.log(position);

  data.push(cardId, title, category, color, details, internshipReport, file, position); 

  console.log(data);

  console.log(cardId);

  addCardData(
    cardId,
    title,
    category,
    color,
    details,
    internshipReport,
    file,
    position
  );

  saveThatShit(
    data
  );

  let tempCard = cardData.find(x => x?.id == cardId);
  if (!tempCard) {
    tempCard = {};
  }

  tempCard.id = cardId
  tempCard.title = title;
  tempCard.category = category;
  tempCard.details = details;
  tempCard.internshipReport = internshipReport;
  tempCard.file = file;
  tempCard.position = position;

  cardData.push(tempCard);

  console.log(cardData)
}

function savePos(position, card) {
   let currentDiv = document.getElementById("divvidiv" + position);
   console.log(currentDiv)
   currentDiv.appendChild(card);
}



//Move a added card automaticaly in the first column
function autoMoveCard(card) {
  let c = 0;

  while (true) {
    let currentDiv = document.getElementById('divvidiv' + c);
    if (currentDiv) {
      if (!divvidivFilled(currentDiv)) {
        currentDiv.appendChild(card);
        return;
      }
    } else {
      break;
    }
    c += 3;
  }
}

//the drop div have a child??
function divvidivFilled(divvidiv) {
  return divvidiv.childNodes.length > 0;
}

//lets get the data objects from the card(s)!
let cardData = [];
// example: id:0 title: "", category: "", color: "", details: "", internship report: "", image: "";

const addCardData = (
  id,
  title,
  category,
  color,
  details,
  report,
  file,
  position
) => {
  let data = {
    id: id,
    title: title,
    category: category,
    color: color,
    details: details,
    report: report,
    file: file,
    position: position,
  };
 
  for (let [key, value] of Object.entries(data)) {
    if (value === undefined || value === '') {
      data[key] = null;
    }
  }

  //send the data to the api!
  fetch('/addNewCard', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  }).then((response) => {
    response.json().then((body) => console.log(body));
  }); 
};

//let the cards be there, when we reload!
function addCardsToBoard(data) {
  // console.log(data)
  data.forEach((element) => {
    addCard(element);
  });
  ignoreAutoMove = false;
}

//delete the card and the data permanently
function deleteData(cardId) {
    fetch('/deleteCard', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({id: cardId}),
    }).then((response) => {
    response.json().then((data) => console.log(data));
    console.log(getCardData())
  });
}

//lets get the data from the database!
function getCardData() {
  fetch('/getCardData', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  }).then((response) => {
    response.json().then((data) => {
      addCardsToBoard(data);
    });
  });
}

//wanna save the data in the popUp?
function getData() {
  fetch('/getCardData', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  }).then((response) => {
    response.json().then((data) => {
      // saveThatShit(data);
    });
  });
}


document.addEventListener('DOMContentLoaded', getCardData());
