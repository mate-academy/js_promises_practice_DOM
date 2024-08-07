'use strict';

const body = document.querySelector('body');

const showNotification = document.createElement('div');

showNotification.setAttribute('data-qa', 'notification');

showNotification.style.backgroundColor = 'white';

const text = document.createElement('p');

showNotification.appendChild(text);

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise.then((message) => {
  text.textContent = message;
  showNotification.classList.add('success');
  showNotification.style.color = 'green';
  body.appendChild(showNotification);
});

firstPromise.catch((message) => {
  text.textContent = message;
  showNotification.classList.add('error');
  showNotification.style.color = 'red';
  body.appendChild(showNotification);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  text.textContent = message;
  showNotification.classList.add('success');
  showNotification.style.color = 'blue';
  showNotification.style.backgroundColor = 'black';
  showNotification.style.top = 100 + 'px';
  body.appendChild(showNotification);
});

let leftClickHappened = false;
let rightClickHappened = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
    } else if (e.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  text.textContent = message;
  showNotification.classList.add('success');
  showNotification.style.color = 'blue';
  showNotification.style.backgroundColor = 'black';
  showNotification.style.top = 200 + 'px';
  body.appendChild(showNotification);
});
