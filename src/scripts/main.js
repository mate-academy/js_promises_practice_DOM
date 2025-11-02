'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const resolveMes = 'First promise was resolved';
  const rejectMes = 'First promise was rejected';

  const timeout = setTimeout(() => {
    reject(rejectMes);
  }, 3000);

  const clickHandler = (e) => {
    if (e.button === 0) {
      clearTimeout(timeout);
      document.removeEventListener('click', clickHandler);
      resolve(resolveMes);
    }
  };

  document.addEventListener('click', clickHandler);
});

const secondPromise = new Promise((resolve) => {
  const resolveMes = 'Second promise was resolved';

  const mouseHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', mouseHandler);
      resolve(resolveMes);
    }
  };

  document.addEventListener('mousedown', mouseHandler);
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve, reject) => {
  const resolveMes = 'Third promise was resolved';

  const mouseHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', mouseHandler);
      resolve(resolveMes);
    }
  };

  document.addEventListener('mousedown', mouseHandler);
});

firstPromise
  .then((msg) => pushNotif(msg, true))
  .catch((msg) => pushNotif(msg, false));

secondPromise.then((msg) => pushNotif(msg, true));

thirdPromise.then((msg) => pushNotif(msg, true));

function pushNotif(message = 'Text', isSuccess = true) {
  const div = document.createElement('div');
  const h1 = document.createElement('h1');

  div.setAttribute('data-qa', 'notification');
  h1.textContent = message;

  if (isSuccess) {
    div.classList.add('success');
  } else {
    div.classList.add('error');
  }

  div.append(h1);
  document.body.append(div);
}
