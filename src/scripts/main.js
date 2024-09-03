'use strict';

const body = document.querySelector('body');

const promise1 = new Promise(function (resolve, reject) {
  const timeOutId = setTimeout(() => {
    reject(new Error());
  }, 3000);

  body.addEventListener('click', () => {
    resolve(['success', 'First promise was resolved']);
    clearTimeout(timeOutId);
  });
});

promise1.then(showMessage).catch(() => {
  showMessage(['error', 'First promise was rejected']);
});

const promise2 = new Promise(function (resolve) {
  body.addEventListener('click', () => {
    resolve(['success', 'Second promise was resolved']);
  });

  body.addEventListener('contextmenu', () => {
    resolve(['success', 'Second promise was resolved']);
  });
});

promise2.then(showMessage);

const promise3 = new Promise(function (resolve) {
  let leftClick = false;
  let rigthClick = false;

  body.addEventListener('click', () => {
    leftClick = true;
    checkClick();
  });

  body.addEventListener('contextmenu', () => {
    rigthClick = true;
    checkClick();
  });

  function checkClick() {
    if (leftClick === true && rigthClick === true) {
      resolve(['success', 'Third promise was resolved']);
    }
  }
});

promise3.then(showMessage);

function showMessage([className, message]) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(className);
  div.textContent = message;
  body.append(div);
}
