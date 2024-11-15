'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject();
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    const newDiv = document.createElement('div');

    newDiv.setAttribute('data-qa', 'notification');
    newDiv.setAttribute('class', 'success');
    newDiv.textContent = 'Firs promise was resolved';
    document.body.append(newDiv);
  })
  .catch(() => {
    const newDiv = document.createElement('div');

    newDiv.setAttribute('data-qa', 'notification');
    newDiv.setAttribute('class', 'error');
    newDiv.textContent = 'Firs promise was rejected';
    document.body.append(newDiv);
  });

secondPromise.then(() => {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.setAttribute('class', 'success');
  newDiv.textContent = 'Second promise was resolved';
  document.body.append(newDiv);
});

thirdPromise.then(() => {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.setAttribute('class', 'success');
  newDiv.textContent = 'Third promise was resolved';
  document.body.append(newDiv);
});
