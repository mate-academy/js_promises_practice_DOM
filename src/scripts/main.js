'use strict';

const body = document.body;

function createMessage(message, isSuccess) {
  const lastElem = document.body.lastElementChild;

  const className = isSuccess ? 'success' : 'warning';

  const textHtml = `
    <div data-qa="notification" class="${className}">
      ${message}
    </div>
  `;

  lastElem.insertAdjacentHTML('beforebegin', textHtml);
}

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', resolve);
  setTimeout(() => reject(new Error('Promise was rejected')), 3000);
});

const promise2 = new Promise(resolve => {
  body.addEventListener('click', resolve);

  body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve();
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkIfBothClicked = () => {
    if (leftClicked && rightClicked) {
      resolve();
    }
  };

  body.addEventListener('click', () => {
    leftClicked = true;
    checkIfBothClicked();
  });

  body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClicked = true;
    checkIfBothClicked();
  });
});

promise1.then(() => createMessage('First promise was resolved'),
  () => createMessage('First promise was rejected'));

promise2.then(() => createMessage('Second promise was resolved'));

promise3.then(() => createMessage('Third promise was resolved'));
