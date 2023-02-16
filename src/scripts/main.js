'use strict';

const body = document.querySelector('body');

new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
}).then(data => {
  successHandler(data);
}).catch(error => {
  errorHandler(error);
});

new Promise((resolve, reject) => {
  body.addEventListener('mousedown', e => {
    resolve('Second promise was resolved');
  });
}).then(data => successHandler(data));

new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  const p1 = new Promise((resolve, reject) => {
    body.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        resolve('left click');
      }
    });
  });

  // eslint-disable-next-line no-shadow
  const p2 = new Promise((resolve, reject) => {
    body.addEventListener('mousedown', (e) => {
      if (e.which === 3) {
        resolve('right click');
      }
    });
  });

  Promise.all([p1, p2]).then(data => {
    resolve('Third promise was resolved');
  });
}).then(data => successHandler(data));

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
