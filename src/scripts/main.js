'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function renderS(message) {
  const markupSuccess = `
  <div data-qa="notification" class="success">
  <span>${message}</span>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', markupSuccess);
}

function renderE(message) {
  const markupError = `
  <div data-qa="notification" class="error">
  <span>${message}</span>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', markupError);
}

firstPromise.then(renderS).catch(renderE);
secondPromise.then(renderS).catch(renderE);
thirdPromise.then(renderS).catch(renderE);
