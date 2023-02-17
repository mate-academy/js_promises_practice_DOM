'use strict';

const body = document.querySelector('body');

const successHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', 'success');
  div.innerHTML = message;

  body.append(div);
};

const errorHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', 'warning');
  div.innerHTML = message;

  body.append(div);
};

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1.then(data => {
  successHandler(data);
}).catch(error => {
  errorHandler(error);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('mousedown', e => {
    resolve('Second promise was resolved');
  });
});

promise2.then(data => successHandler(data));

const promise3 = new Promise((resolve) => {
  let leftBtn = false;
  let rightBtn = false;

  body.addEventListener('mousedown', (e) => {
    if (e.which === 1) {
      leftBtn = true;
    }

    if (e.which === 3) {
      rightBtn = true;
    }

    if (leftBtn === true && rightBtn === true) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then(data => successHandler(data));
