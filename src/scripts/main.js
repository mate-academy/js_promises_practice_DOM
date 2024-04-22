'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  const pressedButtons = {
    left: false,
    right: false,
  };

  function checkCondition() {
    if (pressedButtons.left && pressedButtons.right) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    pressedButtons.left = true;
    checkCondition();
  });

  document.addEventListener('contextmenu', () => {
    pressedButtons.right = true;
    checkCondition();
  });
});

promise1
  .then((resolve) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.setAttribute('class', 'success');

    div.textContent = resolve;
    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.setAttribute('class', 'error');

    div.textContent = error.message;
    document.body.appendChild(div);
  });

promise2.then((resolve) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', 'success');

  div.textContent = resolve;
  document.body.appendChild(div);
});

promise3.then((resolve) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', 'success');

  div.textContent = resolve;
  document.body.appendChild(div);
});
