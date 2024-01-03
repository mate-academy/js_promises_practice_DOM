/* eslint-disable no-console */
'use strict';

const logo = document.getElementById('logo');

//

const firstPromise = new Promise((resolve, reject) => {
  let leftClick = false;

  logo.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      leftClick = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!leftClick) {
      reject(new Error(console.log('First promise was rejected')));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  logo.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      leftClick = true;
    }

    if (click.button === 2) {
      rightClick = true;
    }

    if (rightClick || leftClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  logo.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      leftClick = true;
    }

    if (click.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const onSuccess = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = 'success';

  div.innerText = message;

  document.body.appendChild(div);
};

const onFail = (error) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = 'warning';

  div.innerText = error;

  document.body.appendChild(div);
};

firstPromise.then(onSuccess).catch(onFail);
secondPromise.then(onSuccess).catch(onFail);
thirdPromise.then(onSuccess).catch(onFail);
