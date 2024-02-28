'use strict';

function createDivNotification(state, position) {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${state}">
    ${state === 'success'
    ? `${position} promise was resolved`
    : `${position} promise was rejected`}
  </div>`);
}

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

Promise.race([leftClick])
  .then(() => createDivNotification('success', 'First'))
  .catch(() => createDivNotification('warning', 'First'));

Promise.race([leftClick, rightClick])
  .then(() => createDivNotification('success', 'Second'));

Promise.all([leftClick, rightClick])
  .then(() => createDivNotification('success', 'Third'));
