'use strict';

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
})
  .then(() => showMessage('First promise was resolved'))
  .catch(() => showMessage('First promise was rejected', 'warning'));

new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    if ([0, 2].includes(e.button)) {
      resolve();
    }
  });
})
  .then(() => showMessage('Second promise was resolved'));

new Promise(resolve => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', e => {
    switch (e.button) {
      case 0:
        leftClicked = true;
        break;
      case 2:
        rightClicked = true;
        break;
    }

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
})
  .then(() => showMessage('Third promise was resolved'));

function showMessage(message, result = 'success') {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${result}" data-qa="notification">
      ${message}
    </div>
  `);
}
