'use strict';

let leftClick = false;
let rightClick = false;

const succesDiv1 = document.createElement('div');
const errorDiv1 = document.createElement('div');
const succesDiv2 = document.createElement('div');
const succesDiv3 = document.createElement('div');

succesDiv1.classList.add('message');
errorDiv1.classList.add('warning');
succesDiv2.classList.add('message');
succesDiv3.classList.add('message');

succesDiv1.setAttribute('data-qa', 'notification');
errorDiv1.setAttribute('data-qa', 'notification');
succesDiv2.setAttribute('data-qa', 'notification');
succesDiv3.setAttribute('data-qa', 'notification');

const succesMessage1 = document.createTextNode('First promise was resolved');
const errorMessage1 = document.createTextNode('First promise was rejected');
const succesMessage2 = document.createTextNode('Second promise was resolved');
const succesMessage3 = document.createTextNode('Third promise was resolved');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClick = true;
    resolve();
  });

  setTimeout(() => {
    reject(new Error(errorMessage1));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
    resolve();
  });
});

const promise3 = new Promise((resolve) => {
  if (leftClick && rightClick) {
    resolve();
  }
});

promise1
  .then(() => {
    succesDiv1.appendChild(succesMessage1);
    document.body.appendChild(succesDiv1);
  })
  .catch(() => {
    errorDiv1.appendChild(errorMessage1);
    document.body.appendChild(errorDiv1);
  });

promise2
  .then(() => {
    succesDiv2.appendChild(succesMessage2);
    document.body.appendChild(succesDiv2);
  });

promise3
  .then(() => {
    succesDiv3.appendChild(succesMessage3);
    document.body.appendChild(succesDiv3);
  });
