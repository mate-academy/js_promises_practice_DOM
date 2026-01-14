'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
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

firstPromise
  .then((mes) => {
    showMess(mes, 'success');
  })
  .catch((err) => {
    showMess(err.message, 'error');
  });

secondPromise.then((mes) => {
  showMess(mes, 'success');
});

thirdPromise.then((mes) => {
  showMess(mes, 'success');
});

const showMess = (mes, stat) => {
  const message = document.createElement('div');

  message.classList.add(stat);
  message.dataset.qa = 'notification';
  message.textContent = mes;

  document.body.append(message);
};
