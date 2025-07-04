'use strict';

const body = document.querySelector('body');

let leftClicked = false;
let rightClicked = false;

const promiceOne = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', function handler(e) {
    if (e.button === 0) {
      leftClicked = true;
      resolve('First promise was resolved');
      // document.removeEventListener('mousedown', handler);
    }
  });

  setTimeout(() => {
    if (!leftClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

promiceOne
  .then(() => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.textContent = 'First promise was resolved';
    div.dataset.qa = 'notification';
    body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.textContent = 'First promise was rejected';
    div.dataset.qa = 'notification';
    body.appendChild(div);
  });

const promiceTwo = new Promise((resolve) => {
  function handler(e) {
    if (e.button === 0) {
      leftClicked = true;
      resolve();
    } else if (e.button === 2 || leftClicked) {
      rightClicked = true;
      resolve();
      // document.removeEventListener('mousedown', handler);
    }
  }
  document.addEventListener('mousedown', handler);
});

promiceTwo.then(() => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = 'Second promise was resolved';
  div.dataset.qa = 'notification';
  body.appendChild(div);
});

const promiceTree = new Promise((resolve) => {
  function handleClick(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (rightClicked && leftClicked) {
      // document.removeEventListener('mousedown', handleClick);
      resolve();
    }
  }

  document.addEventListener('mousedown', handleClick);
});

promiceTree.then(() => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = 'Third promise was resolved';
  div.dataset.qa = 'notification';
  body.appendChild(div);
});
