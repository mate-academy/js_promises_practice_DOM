'use strict';

const checkButtons = [0, 2];

new Promise((resolve, reject) => {
  document.addEventListener('mouseup', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
})
  .then(message => notification(message, 'success'))
  .catch(message => notification(message, 'warning'));

new Promise((resolve, reject) => {
  document.addEventListener('mouseup', e => {
    if (checkButtons.includes(e.button)) {
      resolve('Second promise was resolved');
    }
  });
})
  .then(message => notification(message, 'success'));

new Promise((resolve, reject) => {
  document.addEventListener('mouseup', e => {
    checkButtons.splice(checkButtons.indexOf(e.button), 1);

    if (!checkButtons.length) {
      resolve('Third promise was resolved');
    }
  });
})
  .then(message => notification(message, 'success'));

function notification(message, type) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${type}" data-qa="notification">${message}</div>
  `);
}
