'use strict';
const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });
});

const promise2 = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const messageSuccse = (value, clas) => {
  body.insertAdjacentHTML('beforeend',
    `<div class="succse" data-qa="notification">${value}</div>`
  );
};

const messageError = (value, clas) => {
  body.insertAdjacentHTML('beforeend',
    `<div class="error" data-qa="notification">${value}</div>`
  );
};

promise1.then((result) => {
  messageSuccse(result);
}).catch((result) => {
  messageError(result);
});

promise2.then((result) => {
  messageSuccse(result);
});

promise3.then((result) => {
  messageSuccse(result);
});
