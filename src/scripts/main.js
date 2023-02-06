'use strict';

const firstDiv = document.createElement('div');
const secondDiv = document.createElement('div');

firstDiv.setAttribute('data-qa', 'notification');
secondDiv.setAttribute('data-qa', 'notification');
document.querySelector('body').appendChild(firstDiv);
document.querySelector('body').appendChild(secondDiv);

const firstPromise = new Promise(function(resolve, reject) {
  document.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

const secondPromise = new Promise(function(resolve, reject) {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved!');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(handleSuccess).catch(handleReject);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);

function handleSuccess(text) {
  if (text[0] === 'F') {
    firstDiv.classList.add('succes');
    firstDiv.innerText = text;
  } else {
    secondDiv.classList.add('succes');
    secondDiv.textContent = text;
  }
};

function handleReject(text) {
  firstDiv.classList.add('warning');
  firstDiv.textContent = text.message;
};
