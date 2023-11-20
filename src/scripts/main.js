'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
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

// not sure if it should be div, or pop up message
// it's div for now

firstPromise
  .then(addMessage)
  .catch(addBadMessage);
