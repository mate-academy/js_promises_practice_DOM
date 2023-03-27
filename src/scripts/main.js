'use strict';

function createContainer(text, statement) {
  const container = document.createElement('div');

  if (statement) {
    container.classList.add('success');
  } else {
    container.classList.add('error');
  }
  container.dataset.qa = 'notification';
  container.textContent = text;
  document.body.append(container);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.then(
  result => createContainer(result, true),
  error => createContainer(error, false)
);

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(
  result => createContainer(result, true)
);

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.body.addEventListener('click', () => {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', () => {
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(
  result => createContainer(result, true)
);
