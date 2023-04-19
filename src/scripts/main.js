'use strict';

const body = document.querySelector('body');

function notification(text) {
  body.insertAdjacentHTML('beforeend',
    `<div class="warning" data-qa="notification">${text}</div>`);
}

const firstPromise = new Promise((resolve, reject) => {
  function handleClick(ev) {
    ev.preventDefault();

    resolve('First promise was resolved!');
  }

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  function handleClick(ev) {
    ev.preventDefault();

    resolve('Second promise was resolved!');
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromice = new Promise((resolve, reject) => {
  let click;
  let contextmenu;

  const text = 'Third promise was resolved!';

  document.addEventListener('click', () => {
    click = true;

    if (click && contextmenu) {
      resolve(text);
    }
  });

  document.addEventListener('contextmenu', () => {
    contextmenu = true;

    if (click && contextmenu) {
      resolve(text);
    }
  });
});

firstPromise
  .then(result => notification(result))
  .catch(() => notification('First promise was rejected!'));

secondPromise.then(result => notification(result));

thirdPromice.then(result => notification(result));
