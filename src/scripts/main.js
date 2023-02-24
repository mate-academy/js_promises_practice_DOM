'use strict';

function createMessage(message, type, posTop, posRight) {
  const div = document.createElement('div');

  div.innerHTML = `
    <div data-qa="notification" class="message ${type}">
      ${message}
    </div>
  `;

  div.style.position = 'absolute';
  div.style.top = posTop + 'px';
  div.style.right = posRight + 'px';
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

let leftClick;
let rightClick;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
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
});

firstPromise
  .then(result => createMessage(result, 'success', 50, 50))
  .catch(error => createMessage(error, 'warning', 50, 350));

secondPromise
  .then(result => createMessage(result, 'success', 200, 50));

thirdPromise
  .then(result => createMessage(result, 'success', 350, 50));
