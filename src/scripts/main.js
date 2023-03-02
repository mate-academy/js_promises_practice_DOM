'use strict';

const body = document.querySelector('body');
body.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

function showMessage(className, text) {
  body.insertAdjacentHTML("beforeend",`
  <div data-qa="notification" class="${className}">
    ${text}
  </div>
  `
  );
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  })

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000)
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved')
  });

  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved')
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;
  
  document.addEventListener('click', (e) => {
    leftClick = true;

    document.addEventListener('contextmenu', (e) => {
      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      };
    });
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;

    document.addEventListener('click', (e) => {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      };
    });
  });
});

firstPromise
  .then(text => {
    showMessage('success', text);
  })
  .catch(text => {
    showMessage('warning', text);
  });

secondPromise
  .then(text => {
    showMessage('success', text);
  })
  .catch();

thirdPromise
  .then(text => {
    showMessage('success', text);
  })
  .catch();