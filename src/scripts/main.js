'use strict';

const body = document.querySelector('body');

document.oncontextmenu = rightClick;

let right = false;
let left = false;

// there HAS to be bettter solution for right click. I just didnt find it yet

function rightClick(clickEvent) {
  clickEvent.preventDefault();
  right = true;
  // return false;
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (event.button === 0) {
      resolve();
    }
  });
  setTimeout(() => reject(new Error()), 3000);
});

const addMessage = () => {
  const succesDiv = document.createElement('div');

  succesDiv.className = 'message';
  succesDiv.innerText = 'First promise was resolved!';
  body.appendChild(succesDiv);
};

const addBadMessage = () => {
  const succesDiv = document.createElement('div');

  succesDiv.className = 'message error-message';
  succesDiv.innerText = 'First promise was rejected';
  body.appendChild(succesDiv);
};

// not sure aobut one below. Should i override usual rightclick utilities?

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (event.button === 0 || event.button === 2) {
      resolve();
    }
  });
});

const addSecondMessage = () => {
  const succesDiv = document.createElement('div');

  succesDiv.className = 'message__second';
  succesDiv.innerText = 'Second promise was resolved!';
  body.appendChild(succesDiv);
};

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (event.button === 0) {
      left = true;
    }

    if (event.button === 2) {
      right = true;
    }

    if (left === true && right === true) {
      resolve();
    }
  });
});

const addThirdMessage = () => {
  const succesDiv = document.createElement('div');

  succesDiv.className = 'message__third';
  succesDiv.innerText = 'Third promise was resolved!';
  body.appendChild(succesDiv);
};
// not sure if it should be div, or pop up message
// it's div for now

firstPromise
  .then(addMessage)
  .catch(addBadMessage);

secondPromise
  .then(addSecondMessage);

thirdPromise
  .then(addThirdMessage);
