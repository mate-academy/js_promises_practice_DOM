'use strict';

const firstDiv = document.createElement('div');
const secondDiv = document.createElement('div');

firstDiv.setAttribute('data-qa', 'notification');
secondDiv.setAttribute('data-qa', 'notification');

document.querySelector('body').appendChild(firstDiv);
document.querySelector('body').appendChild(secondDiv);

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const hirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

firstPromise.then(res => {
  firstDiv.classList.add('succes');
  firstDiv.innerText = res;
}).catch(error => {
  firstDiv.classList.add('warning');
  firstDiv.innerText = error.message;
});

secondPromise.then(res => {
  secondDiv.classList.add('succes');
  secondDiv.innerText = res;
});

hirdPromise.then(res => {
  firstDiv.innerText = '';
  secondDiv.classList.add('succes');
  secondDiv.innerText = res;
});
