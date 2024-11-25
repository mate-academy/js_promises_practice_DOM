'use strict';

function createPromise(promise, rank) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  body.appendChild(div);
  div.setAttribute('data-qa', 'notification');

  promise.then(() => {
    div.classList.add('success');
    div.innerHTML = `${rank} promise was resolved`;
  });

  promise.catch(() => {
    div.classList.add('warning');
    div.innerHTML = `${rank} promise was rejected`;
  });
}

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Something went wrong'));
    }, 3000);

    document.addEventListener('click', () => {
      resolve();
    });
  });
};

const secondPromise = () => {
  return new Promise((resolve, reject) => {
    'contextmenu click'.split(' ').forEach(
      clickEvent => document.addEventListener(clickEvent, () => {
        resolve();
      }));
  });
};

const thirdPromise = () => {
  return new Promise((resolve, reject) => {
    let leftPressed = false;
    let rightPressed = false;

    document.addEventListener('click', () => {
      leftPressed = true;
      checkIfBothClicked();
    });

    document.addEventListener('contextmenu', () => {
      rightPressed = true;
      checkIfBothClicked();
    });

    function checkIfBothClicked() {
      if (leftPressed && rightPressed) {
        resolve();
      }
    }
  });
};

createPromise(firstPromise(), 'First');
createPromise(secondPromise(), 'Second');
createPromise(thirdPromise(), 'Third');
