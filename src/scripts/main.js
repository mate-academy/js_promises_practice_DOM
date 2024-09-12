'use strict';

function createNotification(num, className = 'success') {
  const textEnd = className === 'success'
    ? 'resolved'
    : 'rejected';

  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class=${className}>
    ${num} promise was ${textEnd}
    </div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve();
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('click', (e) => {
    left = true;

    if (left && right) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    right = true;

    if (left && right) {
      resolve();
    }
  });
});

firstPromise.then(() => createNotification('First'));
firstPromise.catch(() => createNotification('First', 'warning'));
secondPromise.then(() => createNotification('Second'));
thirdPromise.then(() => createNotification('Third'));
