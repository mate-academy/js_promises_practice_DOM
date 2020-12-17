'use strict';

const logo = document.querySelector('.logo');

const alerts = document.createElement('div');

alerts.id = 'alerts';
alerts.style.position = 'fixed';
alerts.style.top = '10px';
alerts.style.right = '10px';

document.body.append(alerts);

const showMessage = (stateClass, msg) => {
  const success = document.createElement('div');

  success.className = stateClass;
  success.innerText = msg;
  success.dataset.qa = 'notification';

  document.getElementById('alerts').append(success);
};

const clickLogoPromise = new Promise((resolve, reject) => {
  logo.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const mouseClickPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.which === 1 || e.which === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const mouseClickBothPromise = new Promise(resolve => {
  const clicked = [];

  document.addEventListener('mousedown', (e) => {
    const key = e.which;

    if (key !== 1 && key !== 3) {
      return;
    }

    if (!clicked.includes(key)) {
      clicked.push(key);
    }

    if (clicked.length === 2) {
      resolve('Third promise was resolved');
    }
  });
});

clickLogoPromise
  .then(result => {
    showMessage('success', result);
  })
  .catch(err => {
    showMessage('warning', err);
  });

mouseClickPromise
  .then(result => {
    showMessage('success', result);
  });

mouseClickBothPromise
  .then(result => {
    showMessage('success', result);
  });
// secondPromise
//   // eslint-disable-next-line no-console
//   .then(result => console.log('succes', result));
