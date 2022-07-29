'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(`Second promise was resolved`);
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then(result => {
    notification(`success`, result);
  })
  .catch(error => {
    notification(`warning`, error);
  });

secondPromise
  .then(result => {
    notification(`success`, result);
  });

thirdPromise
  .then(result => {
    notification(`success`, result);
  });

function notification(nameClass, result) {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${nameClass}">
    ${result}
  </div>
  `);
}
