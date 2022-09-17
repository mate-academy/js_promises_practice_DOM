'use strict';

function createMessage(state, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(state);
  div.innerHTML = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', function(e) {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('click', function(e) {
    resolve(`Second promise was resolved`);
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', function(e) {
    if (e.button === 0) {
      leftClick = true;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then((message) => {
    createMessage('success', message);
  })
  .catch(message => {
    createMessage('warning', message);
  });

secondPromise.then((message) => {
  createMessage('success', message);
});

thirdPromise.then((message) => {
  createMessage('success', message);
});
