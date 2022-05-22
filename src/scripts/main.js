'use strict';

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    document.body.addEventListener('click', (e) => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
};

const secondPromise = () => {
  return new Promise((resolve) => {
    document.body.addEventListener('mousedown', (e) => {
      if (e.buttton === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  });
};

const thirdPromise = () => {
  return new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    document.body.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    });
  });
};

const message = (type, value) => {
  const div = document.createElement('div');

  div.classList.add(type);
  div.dataset.qa = 'notification';
  div.textContent = `${value}`;

  document.body.append(div);
};

firstPromise()
  .then(resolve => {
    message('success', resolve);
  })
  .catch(error => {
    message('error', error);
  });

secondPromise()
  .then(resolve => {
    message('success', resolve);
  });

thirdPromise()
  .then(resolve => {
    message('success', resolve);
  });
