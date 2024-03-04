let highestCardNum = 0;
let divvidivIds = []; 

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
        divvidiv.appendChild(draggedCard);
      });

      divvidivIds.push(divvidiv.id); 

      document.getElementById('cards').appendChild(divvidiv);
    }
  }
}

createDragAndDropDivs();

function allowDrop(ev) {
  ev.preventDefault();
  preventDropOnFilledDropDiv();
}

function drag(ev) {
  draggedCard = ev.srcElement;
}

var activeCard = undefined;
var cardValues = {};
var selectedColor = undefined;
var draggedCard = undefined;
const addButton = document.getElementById('addDiv');
const container = document.getElementById('card1');
const cardSection = document.getElementById('cards');
let count = 0;

//Functional color picker

const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('change', () => {
  selectedColor = colorPicker.value;
});

//Function to show the pop-up window if the edit button is clicked
function editButtonPopUp(cardNum) {
  activeCard = cardNum;
  console.log(activeCard);
  var popUp = document.getElementById('pop-up-window');
  if (popUp.style.display == 'none' || !popUp.style.display) {
    popUp.style.display = 'block';
  } else {
    popUp.style.display = 'none';
  }
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

//Get the blablabla i don't repeat that
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

function addCard(storedCard) {
  document.getElementById('pop-up-window').style.display = 'none';
  let card = document.createElement('div');
  card.draggable = true;
  card.ondragstart = drag;
  card.className = 'card';

  // let deleteButton = document.createElement("button");
  // deleteButton.className = "deleteButton";

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
  cardEdit.class = 'cardButton';

  let cardCategory = document.createElement('p'); //it.className = "cardButton"
  cardEdit.addEventListener('click', function () {
    editButtonPopUp(card.id);
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

  autoMoveCard(card);

  console.log("Die aktive Karte ist:" + card.id)
}



let p = 9;
let parentDiv = null;

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



function deleteDDR() {
  let parentDiv = draggedCard.parentElement;
  if (!parentDiv) {
    return;
  }
  let rowId = parentDiv.id;
  let rowNumber = parseInt(rowId.substring(8));
  for (let i = 0; i < 3; i++) {
    let divToRemove = document.getElementById(`divvidiv${rowNumber + i}`);
    if (divToRemove) {
      divToRemove.remove();
    }
  }
}


let deleteArea = document.getElementById('trash');

deleteArea.addEventListener('dragover', function (event) {
  event.preventDefault();
});

deleteArea.addEventListener('drop', function (event) {
  event.preventDefault();
  deleteCard();
  deleteDDR();
});

function deleteCard() {
  // let row = draggedCard.parentElement;
  // let divvidiv = document.getElementsByClassName("dragDiv");
  // let divvidivCount = divvidiv.length;
  const answer = confirm('Möchten Sie diese Karte endgültig löschen?');
  if (answer) {
    console.log('Element deleted!');
    // for (let i = 0; i < divvidivCount; i++) {
    //   if (divvidiv[i].parentElement === row) {
    //     console.log("div removed");
    //     divvidiv[i].remove();
    //   }
    // }
    draggedCard.parentElement.removeChild(draggedCard);  
  } else {
    console.log('Dann halt nicht :(');
  }
}

addButton.addEventListener('click', (evt) => {
  addCard();
});

//as the name says, let's clear the pop-up window!
function clearThatShit() {
  document.getElementById('title').value = '';
  document.getElementById('category').value = '';
  document.getElementById('colorPicker').value = '#563D7C';
  document.getElementById('details').value = '';
  document.getElementById('report').value = '';
}

//This function will save the parameters for each Card!
function onSave() {
  let card = document.getElementById(activeCard);

  // card.style.backgroundColor = color;
  cardValues[activeCard] = {};
  cardValues[activeCard]['details'] = getDetails();

  card.childNodes[0].style.backgroundColor = selectedColor;
  card.childNodes[1].children[0].innerHTML = getTitle();
  card.childNodes[1].children[1].innerHTML = getCategory();

  editButtonPopUp();

  let cardId = card.id.slice(4);
  let title = document.getElementById('title').value;
  let category = document.getElementById('category').value;
  let color = document.getElementById('colorPicker').value;
  let details = document.getElementById('details').value;
  let internshipReport = document.getElementById('report').value;
  let file = document.getElementById('file').value;
  let position = 0;

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

  clearThatShit();
}

function autoMoveCard(card) {
  // console.log(card);
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

function divvidivFilled(divvidiv) {
  return divvidiv.childNodes.length > 0;
}

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
  console.log(data);

  for (let [key, value] of Object.entries(data)) {
    if (value === undefined || value === '') {
      data[key] = null;
    }
  }

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
      addCardsToBoard(data)
    });
  });
};

function addCardsToBoard(data) {
  data.forEach(element => {
      addCard(element);
  });
}

document.addEventListener("DOMContentLoaded", getCardData());
