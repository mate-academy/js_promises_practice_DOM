'use strict';

const body = document.querySelector('body');

function messageSuccess(item) {
  const div = document.createElement('div');

  body.append(div);
  div.dataset.qa = 'notification';
  div.classList = 'success';
  div.textContent = item;
}

function messageEror(item) {
  const div = document.createElement('div');

  body.append(div);
  div.dataset.qa = 'notification';
  div.classList = 'warning';
  div.textContent = item;
}

let leftClickon = false;
let rightclick = false;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    leftClickon = true;
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((resolve) => {
    messageSuccess(resolve);
  })
  .catch((reject) => {
    messageEror(reject);
  });

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightclick = true;
    resolve(`Second promise was resolved`);
  });

  body.addEventListener('click', (ev) => {
    resolve(`Second promise was resolved`);
  });
});

secondPromise
  .then((resolve) => {
    messageSuccess(resolve);
  });

const thirdPromise = new Promise((resolve, reject) => {
  function cheakClik() {
    if (leftClickon && rightclick) {
      resolve(`Third promise was resolved`);
    }
  }

  body.addEventListener('click', (ev) => {
    cheakClik();
  });

  body.addEventListener('contextmenu', (ev) => {
    cheakClik();
  });
});

thirdPromise
  .then((resolve) => {
    messageSuccess(resolve);
  });
