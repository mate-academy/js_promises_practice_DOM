'use strict';

let documentClicked = false;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
    resolve();
    documentClicked = true;
  });

  if (documentClicked === false) {
    setTimeout(() => reject(new Error()), 3000);
  }
});

promise1
  .then(document.body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">First promise was resolved</div>
  `))
  .catch(() => {
    document.body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="warning">First promise was rejected</div>
    `);
  });
