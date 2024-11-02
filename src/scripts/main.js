'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let leftClick = '';
  let rightClick = '';

  body.addEventListener('mousedown', () => {
    const x = event.buttons;

    if (x === 1) {
      leftClick = 'Ok';
    }

    if (x === 2) {
      rightClick = 'Ok';
    }

    if (leftClick === 'Ok' && rightClick === 'Ok') {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then(myResolve, myReject);

promise2.then(myResolve);

promise3.then(myResolve);

function myResolve(successMessage) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.innerHTML = successMessage;
  body.appendChild(div);
}

function myReject() {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.innerHTML = 'First promise was rejected';
  body.appendChild(div);
}
