'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

function addSuccessDiv(text) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
      ${text}
    </div>
  `);
};

function addErrorDiv(text) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">
      ${text}
    </div>
  `);
};

firstPromise
  .then(addSuccessDiv)
  .catch(addErrorDiv);

secondPromise
  .then(addSuccessDiv)
  .catch(addErrorDiv);

thirdPromise
  .then(addSuccessDiv)
  .catch(addErrorDiv);
