'use strict';

const createMessage = (message, classType) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${classType}" data-qa="notification">
      ${message}
    <div>
  `);
};

const waitForClick = (typeOfClick) => {
  return new Promise(resolve => {
    document.body.addEventListener(typeOfClick, () => resolve());
  });
};

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(Error(`First promise was rejected`));
  }, 3000);
});

firstPromise
  .then(result => {
    createMessage(result, 'success');
  })
  .catch(result => {
    createMessage(result, 'warning');
  });

const secondPromise = new Promise(resolve => {
  Promise.race([waitForClick('click'), waitForClick('contextmenu')])
    .then(() => resolve('Second promise was resolved'));
});

secondPromise
  .then(result => {
    createMessage(result, 'success');
  });

const thirdPromise = new Promise((resolve) => {
  Promise.all([waitForClick('click'), waitForClick('contextmenu')])
    .then(() => resolve('Third promise was resolved'));
});

thirdPromise
  .then(result => {
    createMessage(result, 'success');
  });
