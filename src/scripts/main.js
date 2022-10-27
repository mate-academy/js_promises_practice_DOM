'use strict';

/* First promise with it's methods */
const promise1 = new Promise(function(resolve, reject) {
  document.body.addEventListener('click', () => resolve());

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(() => {
    document.body.insertAdjacentHTML('beforeend',
      `<div class="success" data-qa="notification">
      First promise was resolved</div>`
    );
  })

  .catch(() => {
    document.body.insertAdjacentHTML('beforeend',
      `<div class="warning" data-qa="notification">
      First promise was rejected</div>`
    );
  });

/* Second promise with it's methods */
const promise2 = new Promise(function(resolve, reject) {
  document.body.addEventListener('click', () => resolve());

  document.body.addEventListener('contextmenu', () => resolve());
});

promise2
  .then(() => {
    document.body.insertAdjacentHTML('beforeend',
      `<div class="success" data-qa="notification">
      Second promise was resolved</div>`
    );
  })

  .catch(() => {
    document.body.insertAdjacentHTML('beforeend',
      '<div class = "warning" data-qa="notification"></div>'
    );
  });

/* Third promise with it's methods */
const promise3 = new Promise(function(resolve, reject) {
  let leftButtonClick = false;
  let rightButtonClick = false;

  document.body.addEventListener('click', () => {
    leftButtonClick = true;

    if (leftButtonClick === true && rightButtonClick === true) {
      resolve();
    }
  });

  document.body.addEventListener('contextmenu', () => {
    rightButtonClick = true;

    if (leftButtonClick === true && rightButtonClick === true) {
      resolve();
    }
  });
});

promise3
  .then(() => {
    document.body.insertAdjacentHTML('beforeend',
      `<div class="success" data-qa="notification">
      Third promise was resolved</div>`
    );
  })

  .catch(() => {
    document.body.insertAdjacentHTML('beforeend',
      '<div class = "warning" data-qa="notification"></div>'
    );
  });
