'use strict';

const body = document.querySelector('body');
const firstResult = document.createElement('div');
const secondResult = document.createElement('div');
const thirdResult = document.createElement('div');

firstResult.dataset.qa = 'notification';
secondResult.dataset.qa = 'notification';
thirdResult.dataset.qa = 'notification';

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');

    body.removeEventListener('contextmenu', () => {
      resolve('First promise was resolved');
    });
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');

    body.removeEventListener('click', () => {
      resolve('Second promise was resolved');
    });
  });
});

const thirdPromise = new Promise((resolve) => {
  let clickRight = false;
  let clickLeft = false;

  body.addEventListener('click', () => {
    clickLeft = true;

    if (clickRight && clickLeft) {
      resolve('Third promise was resolved');

      body.removeEventListener('click', () => {
        resolve('Third promise was resolved');
      });

      body.removeEventListener('contextmenu', () => {
        resolve('Third promise was resolved');
      });
    }
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    clickRight = true;

    if (clickRight && clickLeft) {
      resolve('Third promise was resolved');

      body.removeEventListener('click', () => {
        resolve('Third promise was resolved');
      });

      body.removeEventListener('contextmenu', () => {
        resolve('Third promise was resolved');
      });
    }
  });
});

firstPromise
  .then((result) => {
    firstResult.className = 'success';
    firstResult.innerHTML = result;
  })
  .catch((errorMessage) => {
    firstResult.className = 'error';
    firstResult.innerHTML = errorMessage.message;
  })
  .finally(() => {
    body.appendChild(firstResult);
  });

secondPromise.then((result) => {
  secondResult.className = 'success';
  secondResult.innerHTML = result;
  body.appendChild(secondResult);
});

thirdPromise.then((result) => {
  thirdResult.className = 'success';
  thirdResult.innerHTML = result;
  body.appendChild(thirdResult);
});
