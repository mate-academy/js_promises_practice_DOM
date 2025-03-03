'use strict';

document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.body.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearInterval(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const clickCheck = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.body.addEventListener('click', () => {
    leftClick = true;
    clickCheck();
  });

  document.body.addEventListener('contextmenu', () => {
    rightClick = true;
    clickCheck();
  });
});

const successPromise = (message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.append(div);
};

const errorPromise = (error) => {
  const div = document.createElement('div');

  div.classList.add('error');
  div.dataset.qa = 'notification';
  div.textContent = error.message;
  document.body.append(div);
};

firstPromise.then(successPromise).catch(errorPromise);
secondPromise.then(successPromise);
thirdPromise.then(successPromise);
