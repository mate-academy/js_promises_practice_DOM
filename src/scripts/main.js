'use strict';

const logo = document.querySelector('.logo');
const info = document.querySelector('.info');

const insert = (text, clas) => {
  info.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class=${clas}>
    ${text}
  </div>
`);
};

new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    const reason = 'no time';

    reject(reason);
  }, 3000);
}).then(() => {
  insert('First promise was resolved', 'success');
}).catch(() => {
  insert('First promise was rejected', 'warning');
});

new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve();
  });

  document.body.addEventListener('contextmenu', () => {
    resolve();
  });
}).then(() => {
  insert('Second promise was resolved', 'success');
});

new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
}).then(() => {
  insert('Third promise was resolved', 'success');
});
