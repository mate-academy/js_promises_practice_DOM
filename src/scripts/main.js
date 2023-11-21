'use strict';

const body = document.querySelector('body');

document.oncontextmenu = rightClick;

let right = false;
let left = false;

// there HAS to be bettter solution for right click. I just didnt find it yet

function rightClick(clickEvent) {
  // clickEvent.preventDefault();
  right = true;
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (event.button === 0) {
      resolve('First');
    }
  });
  setTimeout(() => reject(new Error('First')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', () => {
    if (event.button === 0 || event.button === 2) {
      resolve('Second');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', () => {
    if (event.button === 0) {
      left = true;
    }

    if (event.button === 2) {
      right = true;
    }

    if (left === true && right === true) {
      resolve('Third');
    }
  });
});

const success = (number) => {
  const succesDiv = document.createElement('div');

  succesDiv.setAttribute('data-qa', 'notification');

  succesDiv.className = 'success';
  succesDiv.innerText = `${number} promise was resolved!`;
  body.appendChild(succesDiv);
};

const error = (number) => {
  const succesDiv = document.createElement('div');

  succesDiv.setAttribute('data-qa', 'notification');

  succesDiv.className = 'warning';
  succesDiv.innerText = `${number} promise was rejected`;
  body.appendChild(succesDiv);
};

// not sure if it should be div, or pop up message
// it's div for now

firstPromise
  .then(text => success(text))
  .catch(text => error(text));

secondPromise
  .then(text => success(text))
  .catch(text => error(text));

thirdPromise
  .then(text => success(text))
  .catch(text => error(text));
