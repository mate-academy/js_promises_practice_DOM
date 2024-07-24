'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    e.preventDefault();
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

firstPromise
  .then((result) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');
    div.textContent = `${result}`;
    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');
    div.textContent = `${error}`;
    document.body.appendChild(div);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    // if (e.button === 0 || e.button === 2) {
    //   resolve('Second promise was resolved');
    // }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((result) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = `${result}`;
  document.body.appendChild(div);
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((result) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = `${result}`;
  document.body.appendChild(div);
});
