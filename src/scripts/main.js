'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  const arrayClicks = [];

  const clicksChecker = () => {
    if (arrayClicks.includes('leftClick')
    && arrayClicks.includes('rightClick')) {
      return resolve();
    }
  };

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      arrayClicks.push('leftClick');

      clicksChecker();
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      arrayClicks.push('rightClick');

      clicksChecker();
    }
  });
});

const handlePromise = (className, number, outcome) => {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${className}">
    ${number} promise was ${outcome}
  </div>
  `);
};

promise1
  .then(() => {
    handlePromise('success', 'First', 'resolved');
  })
  .catch(() => {
    handlePromise('warning', 'First', 'rejected');
  });

promise2
  .then(() => {
    handlePromise('success', 'Second', 'resolved');
  })
  .catch(() => {
    handlePromise('warning', 'Second', 'rejected');
  });

promise3
  .then(() => {
    handlePromise('success', 'Third', 'resolved');
  })
  .catch(() => {
    handlePromise('warning', 'Third', 'rejected');
  });
