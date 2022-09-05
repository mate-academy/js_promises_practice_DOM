'use strict';

function showMessage(NameClass, message) {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${NameClass}">
    ${message}
    </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button !== 0) {
      return;
    }
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    document.addEventListener('contextmenu', (eventt) => {
      eventt.preventDefault();

      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    });
  });
});

firstPromise
  .then(message => {
    showMessage('success', message);
  })
  .catch(message => {
    showMessage('warning', message);
  });

secondPromise
  .then(message => {
    showMessage('success', message);
  })
  .catch();

thirdPromise
  .then(message => {
    showMessage('success', message);
  })
  .catch();
