'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!leftClick) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function firstResolve(message) {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.append(div);
}

function firstReject(error) {
  const div = document.createElement('div');

  div.className = 'error';
  div.setAttribute('data-qa', 'notification');
  div.textContent = error.message;

  document.body.append(div);
}

function secondResolve(message) {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.append(div);
}

function thirdResolve(message) {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.append(div);
}

firstPromise.then(firstResolve).catch(firstReject);
secondPromise.then(secondResolve);
thirdPromise.then(thirdResolve);
