'use strict';

// const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', (e) => {
    clicked = true;
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    if (clicked === false) {
      reject(new Error(`First promise was rejected`));
    }
  }, 3000);
});

firstPromise
  .then((value) => {
    const div = document.createElement('div');

    div.textContent = value;
    div.setAttribute('data-qa', 'notification');
    div.classList.add(`success`);

    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.textContent = error.message;
    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);

    document.body.appendChild(div);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', (e) => {
    resolve(`Second promise was resolved`);
  });
});

secondPromise
  .then((value) => {
    const div = document.createElement('div');

    div.textContent = value;
    div.setAttribute('data-qa', 'notification');
    div.classList.add(`success`);

    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.textContent = error.message;
    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);

    document.body.appendChild(div);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;

    if (rightClick && leftClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

thirdPromise
  .then((value) => {
    const div = document.createElement('div');

    div.textContent = value;
    div.setAttribute('data-qa', 'notification');
    div.classList.add(`success`);

    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.textContent = error.message;
    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);

    document.body.appendChild(div);
  });
