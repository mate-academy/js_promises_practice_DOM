'use strict';

function addBodyMessage(message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification">
      ${message}
    </div>
  `);
}

function checkClick(resolve) {
  document.addEventListener('click', resolve);
}

function checkContextmenu(resolve) {
  document.addEventListener('contextmenu', e => {
    e.preventDefault();

    resolve();
  });
}

const leftMouseClick = new Promise(resolve => {
  checkClick(resolve);
});

const rightMouseClick = new Promise(resolve => {
  checkContextmenu(resolve);
});

const promise1 = new Promise((resolve, reject) => {
  checkClick(resolve);

  setTimeout(reject, 3000);
});

promise1
  .then(() => {
    addBodyMessage('First promise was resolved');
  })
  .catch(() => {
    addBodyMessage('First promise was rejected');
  });

const promise2 = new Promise(resolve => {
  checkClick(resolve);
  checkContextmenu(resolve);
});

promise2
  .then(() => {
    addBodyMessage('Second promise was resolved');
  });

const promise3 = new Promise(resolve => {
  Promise.all([leftMouseClick, rightMouseClick])
    .then(resolve);
});

promise3
  .then(() => {
    addBodyMessage('Third promise was resolved');
  });
