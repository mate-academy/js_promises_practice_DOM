'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (rightClickEvent) => {
    rightClickEvent.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let isClickedLeft = false;
  let isClickedRight = false;

  const handlePromiseResult = () => {
    if (isClickedLeft && isClickedRight) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    isClickedLeft = true;
    handlePromiseResult();
  });

  document.addEventListener('contextmenu', (rightClickEvent) => {
    rightClickEvent.preventDefault();
    isClickedRight = true;
    handlePromiseResult();
  });
});

function appendNotification(result, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.textContent = result;
  document.body.appendChild(div);
}

firstPromise
  .then(appendNotification)
  .catch((error) => appendNotification(error, true));

secondPromise.then(appendNotification);

thirdPromise.then(appendNotification);
