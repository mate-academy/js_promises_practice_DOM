'use strict';

let leftClicked = false;
let rightClicked = false;

function createMessage(message, className) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(className);
  div.textContent = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      leftClicked = true;

      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then((data) => {
    createMessage(data, 'success');
  })
  .catch((error) => {
    createMessage(error, 'error');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      leftClicked = true;

      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    resolve('Second promise was resolved');
  },
  { once: true },
);
});

secondPromise.then((data) => {
  createMessage(data, 'success');
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((data) => {
  createMessage(data, 'success');
});
