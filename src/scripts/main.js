'use strict';

const logo = document.querySelector('.logo');

const createMessage = (className, message) => {
  logo.insertAdjacentHTML('afterend', `
    <div data-qa="notification" class="${className}">${message}</div>
  `);
};

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('Error'));
  }, 3000);
})
  .then(() => (
    createMessage('promise first_resolve', 'First promise was resolved'
    )
  ))
  .catch(() => (
    createMessage('promise first_reject', 'First promise was rejected'
    )
  ));

new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    e.button !== 1 && resolve();
  });
})
  .then(() => (
    createMessage('promise second_resolve', 'Second promise was resolved')
  ));

new Promise((resolve) => {
  let left = false;
  let contextmenu = false;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        left = true;
        break;
      case 2:
        contextmenu = true;
        break;
    };

    (left && contextmenu) && resolve();
  });
})
  .then(() => (
    createMessage('promise third_resolve', 'Third promise was resolved')
  ));
