'use strict';

const body = document.querySelector('body');

function message(className,text) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class= '${className}'>
    ${text}
  </div>
  `);
}

const firstPromise = new Promise(function(resolve, reject) {
  document.addEventListener('mousedown', () => {
    resolve(' First promise was resolved ');
  });

  setTimeout(() =>
    reject(new Error(' First promise was rejected ')), 3000);
});

const secondPromise = new Promise(function(resolve) {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(' Second promise was resolved ');
    }
  });
});

const thirdPromise = new Promise(function(resolve, reject) {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(' Third promise was resolved ');
    }
  });
});

firstPromise
.then(text => message('succes', text))
.catch(error => message('warning', error));


secondPromise
.then(text => message('succes', text));

thirdPromise
.then(text => message('succes', text));
