'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const clickHandler1 = () => {
    resolve();
    clearTimeout(timerId);
    document.removeEventListener('click', clickHandler1);
  };

  document.addEventListener('click', clickHandler1);
});

promise1.then(
  () => success('First promise was resolved'),
  () => error('First promise was rejected'),
);

const promise2 = new Promise((resolve, reject) => {
  const clickHandler2 = () => {
    resolve();
    document.removeEventListener('click', clickHandler2);
    document.removeEventListener('contextmenu', clickHandler2);
  };

  document.addEventListener('click', clickHandler2);
  document.addEventListener('contextmenu', clickHandler2);
});

promise2.then(() => success('Second promise was resolved'), null);

const promise3 = new Promise((resolve, reject) => {
  let left = 0;
  let right = 0;

  function canPass(leftFun, rightFun) {
    if (leftFun > 0 && rightFun > 0) {
      return true;
    }
  }

  const clickHandler3 = () => {
    left++;

    if (canPass(left, right)) {
      resolve();
      document.removeEventListener('click', clickHandler3);
      document.removeEventListener('contextmenu', clickHandler4);
    }
  };

  const clickHandler4 = () => {
    right++;

    if (left > 0 && right > 0) {
      resolve();
      document.removeEventListener('click', clickHandler3);
      document.removeEventListener('contextmenu', clickHandler4);
    }
  };

  document.addEventListener('click', clickHandler3);
  document.addEventListener('contextmenu', clickHandler4);
});

promise3.then(
  () => success('Third promise was resolved'),
  () => error('Third promise was rejected'),
);

function success(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;

  document.body.appendChild(div);
}

function error(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message;

  document.body.appendChild(div);
}
