'use strict';

const body = document.querySelector('body');
const logoMA = document.querySelector('h1');

const createNotification = function(message, className) {
  const DIV = `<div data-qa="notification" class='${className}'>
                 ${message}
               </div>`;

  body.insertAdjacentHTML('beforeend', DIV);
};

const promise1 = new Promise((resolve, reject) => {
  logoMA.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('time out'));
  }, 3000);
});

promise1.then(() => {
  createNotification('First promise was resolved', 'success');
}).catch(() => {
  createNotification('First promise was rejected', 'warning');
});

const promise2 = new Promise((resolve, reject) => {
  logoMA.onmousedown = (event) => {
    if (event.button === 0) {
      logoMA.addEventListener('click', () => {
        resolve();
      });
    }

    logoMA.addEventListener('contextmenu', (e) => {
      if (event.button === 2) {
        resolve();
      }
    });
  };
});

promise2.then(() => {
  createNotification('Second promise was resolved', 'success');
});

const promise3 = new Promise((resolve, reject) => {
  let clickHappend = false;
  let contextmenuHappened = false;

  logoMA.addEventListener('click', () => {
    clickHappend = true;

    if (clickHappend && contextmenuHappened) {
      resolve();
    }
  });

  logoMA.addEventListener('contextmenu', (event) => {
    contextmenuHappened = true;

    if (clickHappend && contextmenuHappened) {
      resolve();
    }
  });
});

promise3.then(() => {
  createNotification('Third promise was resolved', 'success');
});
