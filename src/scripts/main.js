'use strict';

const body = document.body;

function success(data) {
  const message = document.createElement('div');

  message.classList.add('success');
  message.dataset.qa = 'notification';
  message.textContent = data;
  body.append(message);
}

function error(data) {
  const message = document.createElement('div');

  message.classList.add('error');
  message.dataset.qa = 'notification';
  message.textContent = data;
  body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  const successMessage = 'First promise was resolved';
  const errorMessage = 'First promise was rejected';

  const timer = setTimeout(() => {
    reject(errorMessage);
  }, 3000);

  body.addEventListener('click', (e) => {
    clearTimeout(timer);
    resolve(successMessage);
  });
});

firstPromise
  .then((successMessage) => {
    success(successMessage);
  })
  .catch((errorMessage) => {
    error(errorMessage);
  });

const secondPromise = new Promise((resolve) => {
  const successMessage = 'Second promise was resolved';

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(successMessage);
    }
  });
});

secondPromise.then((successMessage) => {
  success(successMessage);
}).catch((errorMessage) => {
  error(errorMessage);
})

const thirdPromise = new Promise((resolve) => {
  const successMessage = 'Third promise was resolved';
  let leftClick = false;
  let rightClick = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(successMessage);
    }
  });
});

thirdPromise.then((successMessage) => {
  success(successMessage);
}).catch((errorMessage) => {
  error(errorMessage);
})
