'use strict';

const logo = document.querySelector('.logo');
const info = document.querySelector('.info');

new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    const reason = 'no time';

    reject(reason);
  }, 3000);
}).then(() => {
  info.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    First promise was resolved
  </div>
`);
}).catch(() => {
  info.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="warning">
    First promise was rejected
  </div>
`);
});

new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve();
  });

  document.body.addEventListener('contextmenu', () => {
    resolve();
  });
}).then(() => {
  info.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      Second promise was resolved
    </div>
  `);
});

new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    document.body.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  document.body.addEventListener('contextmenu', () => {
    document.body.addEventListener('click', () => {
      resolve();
    });
  });
}).then(() => {
  info.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    Third promise was resolved
  </div>
`);
});
