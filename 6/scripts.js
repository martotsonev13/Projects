var peopleArr = [],

    editButton = document.querySelector('.EditPageButton'),
    addPersonButton = document.getElementById('AddOnePerson'),
    saveButton = document.getElementById('SaveChanges'),
    deleteButton = document.getElementById('DeleteItem'),

    peopleCardWrapper = document.querySelector('.PeopleCardWrapper'),
    allInputsArr = document.querySelectorAll('.EditPeopleInput'),
    domNodeMenu = document.querySelector('.EditPeopleWrapper'),
    buttonWrapper = document.querySelector('.ButtonWrapper');

editButton.addEventListener('click', onToggleAside);
addPersonButton.addEventListener('click', onAddPersonClick);
saveButton.addEventListener('click', onSaveButtonClick);
deleteButton.addEventListener('click', onDeleteButtonClick);


function onToggleAside(){
  editButton.classList.toggle('EditPageButton--active');
  domNodeMenu.classList.toggle('EditPeopleWrapper--expanded');
}


function onAddPersonClick(){
  var errorWrapper = document.querySelector('.EditPeopleWrapper .ErrorMessageWrapper'),
      personObj = getDataFromForm(),
      isInputValid = validateOnePerson(personObj);

  if(isInputValid){
    peopleArr.push(personObj);
    errorWrapper.innerHTML = '';
    peopleCardWrapper.classList.remove('empty');
    clearForm();
    addOneCard(personObj);
  } else {
    errorWrapper.innerHTML = 'Some of the fields are not filled correctly!';
  }
}


function onSaveButtonClick(){
  var activeCard  = document.querySelector('.PersonCard--active'),
      cardId = activeCard.dataset.id,
      personObj = getDataFromForm();

  peopleArr[cardId] = personObj;
  activeCard.innerHTML = getCardInnerHTML(personObj);
  deselectAllCards();
  clearForm();
  buttonWrapper.classList.remove('ButtonWrapper--edit');
}


function getDataFromForm(){
  var personObj = {},
      allInputsArr = document.querySelectorAll('.EditPeopleInput');

  for(var i = 0; i < allInputsArr.length; i++){
      var name = allInputsArr[i].getAttribute('name');
      
      personObj[name] = allInputsArr[i].value;
  }

  return personObj;
}


function validateOnePerson(personObj){
  var isValid = false;
  var isNameValid = personObj.name !== '';
  var isJobValid = personObj.job !== '';
  var isEmailValid = personObj.email !== '';
  var isPhoneValid = personObj.phone !== '';

  isValid = isNameValid && isJobValid && isEmailValid && isPhoneValid;

  return isValid;
}


function clearForm(){
  var allInputsArr = document.querySelectorAll('.EditPeopleInput');

  for(var i = 0; i < allInputsArr.length; i++){
      allInputsArr[i].value = '';
  }
}


function addOneCard(personObj){
  var card = document.createElement('div');

  card.classList.add('PersonCard');
  card.dataset.id = peopleArr.length - 1;
  card.addEventListener('click', onSelectOneCard);
  card.innerHTML = getCardInnerHTML(personObj);

  peopleCardWrapper.appendChild(card);
}

function getCardInnerHTML(personObj){
  var html =  
    '<div class="PersonImage"></div>' +
    '<div class="PersonName" data-type="name">' + personObj.firstname + '</div>' +
    '<div class="personJobTitle" data-type="job">' + personObj.job + '</div>' +
    '<div class="eMail" data-type="email">' + personObj.email + '</div>' +
    '<div class="PersonPhoneNumber" data-type="phone">' + personObj.phone +'</div>';

  return html;
}


function onSelectOneCard(event){
    var currentCard = event.currentTarget;
        cardId = currentCard.dataset.id,
        personObj = peopleArr[cardId];
        isCurrentCardActive = false;

    isCurrentCardActive = currentCard.classList.contains('PersonCard--active');
    deselectAllCards();    

    
    if(!isCurrentCardActive){
      currentCard.classList.add('PersonCard--active');
      fillForm(personObj);
      buttonWrapper.classList.add('ButtonWrapper--edit');
    } else {
      clearForm();
      buttonWrapper.classList.remove('ButtonWrapper--edit');
    }
}


function deselectAllCards(){
  var cardsArr = document.querySelectorAll('.PersonCard');

  for(var i = 0; i <  cardsArr.length; i++){
    cardsArr[i].classList.remove('PersonCard--active');
  }
}


function fillForm(personObj){
  var inputName = domNodeMenu.querySelector('.EditPeopleInput[name="firstname"]'),
      inputJob = domNodeMenu.querySelector('.EditPeopleInput[name="job"]'),
      inputPhone = domNodeMenu.querySelector('.EditPeopleInput[name="phone"]'),
      inputEmail = domNodeMenu.querySelector('.EditPeopleInput[name="email"]');

  inputName.value = personObj.firstname;
  inputJob.value = personObj.job;
  inputPhone.value = personObj.phone;
  inputEmail.value = personObj.email;
}


function onDeleteButtonClick(){
  var activeCard  = document.querySelector('.PersonCard--active'),
      cardId = Number(activeCard.dataset.id);

  clearForm();
  peopleArr.splice(cardId, 1); 
  activeCard.remove(); 
  buttonWrapper.classList.remove('ButtonWrapper--edit'); 

 
  for(var i = cardId; i < peopleArr.length; i++){
    var element = document.querySelector('.PersonCard[data-id="' + (i+1) + '"]');
    element.dataset.id = i;
  }

  if(peopleArr.length === 0){
    peopleCardWrapper.classList.add('empty');
  }
}