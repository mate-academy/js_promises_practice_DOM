'use strict';

// eslint-disable-next-line no-unused-vars
const firstPromise = new Promise((resolve, reject) => {
  const container = document.createElement('div');

  container.dataset.qa = 'notification';

  document.addEventListener('click', () => {
    container.classList.add('success');
    container.textContent = 'First promise was resolved';

    resolve(document.body.append(container));
  });

  setTimeout(() => {
    container.classList.add('warning');
    container.textContent = 'First promise was rejected';

    reject(document.body.append(container));
  }, 3000);
});

// eslint-disable-next-line no-unused-vars
const secondPromise = new Promise((resolve) => {
  const container = document.createElement('div');

  container.dataset.qa = 'notification';
  container.classList.add('success');
  container.textContent = 'Second promise was resolved';

  document.addEventListener('click', () => {
    resolve(document.body.append(container));
  });

  document.addEventListener('contextmenu', () => {
    event.preventDefault();
    resolve(document.body.append(container));
  });
});

// eslint-disable-next-line no-unused-vars
const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const container = document.createElement('div');

  container.dataset.qa = 'notification';
  container.textContent = 'Third promise was resolved';

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve(document.body.append(container));
    }
  });

  document.addEventListener('contextmenu', () => {
    event.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve(document.body.append(container));
    }
  });
});
