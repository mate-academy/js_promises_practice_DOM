'use strict';

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

function createMessgeDiv(text, messageClass) {
  const messageDiv = document.createElement('div');

  messageDiv.setAttribute('data-qa', 'notification');
  document.querySelector('body').appendChild(messageDiv);
  messageDiv.classList.add(messageClass);
  messageDiv.innerText = text;
}

function handleSuccess(text) {
  createMessgeDiv(text, 'succes');
};

function handleReject(text) {
  createMessgeDiv(text, 'warning');
};
