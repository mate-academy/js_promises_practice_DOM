'use strict';

const body = document.querySelector('body');

function success(textHTML) {
  body.insertAdjacentHTML('beforeend', textHTML);
}

function error(textHTML) {
  body.insertAdjacentHTML('beforeend', textHTML);
}

const firstPromise = new Promise((resolve, reject) => {
  function handleClick(ev) {
    ev.preventDefault();

    resolve(`
      <div div data-qa="notification">
        First promise was resolved!
      </div>
    `);
  }

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  function handleClick(ev) {
    ev.preventDefault();

    resolve(`
      <div div data-qa="notification">
        Second promise was resolved!
      </div>
    `);
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromice = new Promise((resolve, reject) => {
  let click;
  let contextmenu;

  const textHTML = `
      <div div data-qa="notification">
        Third promise was resolved!
      </div>
    `;

  document.addEventListener('click', () => {
    click = true;

    if (click && contextmenu) {
      resolve(textHTML);
    }
  });

  document.addEventListener('contextmenu', () => {
    contextmenu = true;

    if (click && contextmenu) {
      resolve(textHTML);
    }
  });
});

firstPromise
  .then(result => {
    success(result);
  }).catch(() => {
    error(`
    <div div data-qa="notification">
      First promise was rejected!
    </div>
  `);
  });

secondPromise.then(result => {
  success(result);
});

thirdPromice.then(result => {
  success(result);
});
