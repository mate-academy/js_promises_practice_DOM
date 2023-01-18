'use strict';

const body = document.querySelector('body');
let rightClick = false;
let leftClick = false;

body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', ev => {
    if (ev.button === 0) {
      leftClick = true;
      resolve();
    };
  });

  setTimeout(() => reject(new Error()), 3000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('mousedown', ev => {
    if (ev.button === 0 || ev.button === 2) {
      rightClick = true;
      resolve();
    };
  });
});

const promise3 = new Promise((resolve) => {
  body.addEventListener('mousedown', ev1 => {
    body.addEventListener('mousedown', ev2 => {
      if (rightClick === true && leftClick === true) {
        resolve();
      };
    });
  });
});

const handler = (number, outcome) => {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification">${number} promise was ${outcome}</div>`);
};

promise1.then(() => {
  handler('First', 'resolved');
})
  .catch(() => {
    handler('First', 'rejected'); ;
  });

promise2.then(() => {
  handler('Second', 'resolved'); ;
});

promise3.then(() => {
  handler('Third', 'resolved'); ;
});
