'use strict';

const firstPromise = new Promise(function (resolve, reject) {
  document.addEventListener('mousedown', (e) => {
    setTimeout(() => {
      reject(new Error(`First promise was rejected`));
    }, 3000);

    if (e.button === 0) {
      clearTimeout();
      resolve('First promise was resolved');
    }
  });
});

let leftClicked = false;
let rightClicked = false;

const secondPromise = new Promise(function (resolve) {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(function (resolve) {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (rightClicked && leftClicked) {
      resolve('Second promise was resolved');
    }
  });
});

function handleSuccess(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

// Function to append error message
function handleError(error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';
  div.textContent = error.message;
  document.body.appendChild(div);
}

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
