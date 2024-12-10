'use strict';

let isPromise1Clicked = false;
let isLeftMbClicked = false;
let isRightMbClicked = false;

const promise1 = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    if (!isPromise1Clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  document.addEventListener('click', () => {
    isPromise1Clicked = true;
    clearTimeout(timeoutId);
    resolve();
  });
});

promise1.then(() => {
  const div = document.createElement('div');

  div.innerHTML = 'First promise was resolved';
  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
});

promise1.catch(() => {
  const div = document.createElement('div');

  div.innerHTML = 'First promise was rejected';
  div.className = 'error';
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });

  document.addEventListener('click', () => {
    resolve();
  });
});

promise2.then(() => {
  const div = document.createElement('div');

  div.innerHTML = 'Second promise was resolved';
  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
});

const promise3 = new Promise((resolve, reject) => {
  const checkClicks = () => {
    if (isLeftMbClicked && isRightMbClicked) {
      resolve();
    }
  };

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeftMbClicked = true;
    } else if (e.button === 2) {
      isRightMbClicked = true;
    }
    checkClicks();
  });
});

promise3.then(() => {
  const div = document.createElement('div');

  div.innerHTML = 'Third promise was resolved';
  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
});
