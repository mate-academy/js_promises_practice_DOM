'use strict';

const body = document.querySelector('body');

const showNotification = document.createElement('div');

showNotification.setAttribute('data-qa', 'notification');

showNotification.style.backgroundColor = 'white';

const text = document.createElement('p');

showNotification.appendChild(text);

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
      resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise.then((message) => {
  text.textContent = message;
  showNotification.classList.add('success');
  showNotification.style.color = 'green';
  body.appendChild(showNotification);
})
  .catch((message) => {
  text.textContent = message;
  showNotification.classList.add('error');
  showNotification.style.color = 'red';
  body.appendChild(showNotification);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    rightClick = true;
  });

  if (leftClick || rightClick) {
    resolve('Second promise was resolved');
  }
});

secondPromise.then((message) => {
  text.textContent = message;
  showNotification.classList.add('success');
  showNotification.style.color = 'blue';
  showNotification.style.backgroundColor = 'black';
  showNotification.style.top = 100 + 'px';
  body.appendChild(showNotification);
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
  });

  if (leftClick && rightClick) {
    resolve('Third promise was resolved');
  };
});

thirdPromise.then((message) => {
  text.textContent = message;
  showNotification.classList.add('success');
  showNotification.style.color = 'blue';
  showNotification.style.backgroundColor = 'black';
  showNotification.style.top = 200 + 'px';
  body.appendChild(showNotification);
});
