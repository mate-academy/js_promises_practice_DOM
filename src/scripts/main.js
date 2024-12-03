'use strict';

function notification(value) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList = value[0];
  div.innerText = value[1];
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    const value = ['success', 'First promise was resolved'];

    resolve(value);

    e.preventDefault();
  });

  setTimeout(() => {
    const value = ['error', 'First promise was rejected'];

    reject(value);
  }, 3000);
});

firstPromise
  .then((value) => {
    notification(value);
  })

  .catch((value) => {
    notification(value);
  });

const secondPromise = new Promise((resolve) => {
  const value = ['success', 'Second promise was resolved'];

  document.addEventListener('click', (e) => {
    resolve(value);
    e.preventDefault();
  });

  document.addEventListener('contextmenu', (e) => {
    resolve(value);
    e.preventDefault();
  });
});

secondPromise.then((value) => {
  notification(value);
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', (e) => {
    leftClick = true;
    both();
    e.preventDefault();
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;
    both();
    e.preventDefault();
  });

  function both() {
    if (rightClick && leftClick) {
      const value = ['success', 'Third promise was resolved'];

      resolve(value);
    }
  }
});

thirdPromise.then((value) => {
  notification(value);
});
