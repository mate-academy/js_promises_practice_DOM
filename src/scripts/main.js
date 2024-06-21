'use strict';

function throwMessage(message, variant = 'success') {
  const messageEl = document.createElement('div');

  messageEl.classList.add(variant);
  messageEl.setAttribute('data-qa', 'notification');
  messageEl.textContent = message;

  document.body.append(messageEl);
}

const promise1 = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeout);
    resolve('Frirst promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
  const listener = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', listener);

  document.addEventListener('contextmenu', listener);
});

const promise3 = new Promise((resolve) => {
  const conditionsArray = [false, false];

  const listener = (triggerIdx, conditionIdx) => {
    conditionsArray[triggerIdx] = true;

    if (conditionsArray[conditionIdx]) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => listener(0, 1));

  document.addEventListener('contextmenu', () => listener(1, 0));
});

promise1
  .then((data) => {
    throwMessage(data);
  })
  .catch((err) => {
    throwMessage(err.message, 'error');
  });

promise2.then((data) => {
  throwMessage(data);
});

promise3.then((data) => {
  throwMessage(data);
});
