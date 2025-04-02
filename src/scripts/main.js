'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  function checkClick() {
    if (leftClickHappened || rightClickHappened) {
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClickHappened = true;

    checkClick();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickHappened = true;

    checkClick();
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  function checkBothClicks() {
    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClickHappened = true;

    checkBothClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickHappened = true;

    checkBothClicks();
  });
});

promise1
  .then((result) => {
    appendMessage(result);
  })
  .catch((error) => {
    appendMessage(error.message, true);
  });

promise2.then((result) => {
  appendMessage(result);
});

promise3.then((result) => {
  appendMessage(result);
});

function appendMessage(text, isError = false) {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');

  notificationDiv.className = isError ? 'error' : 'success';
  notificationDiv.textContent = text;
  document.body.appendChild(notificationDiv);
}
