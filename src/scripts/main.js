'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('success');
  });

  setTimeout(reject, 3000);
});

const promise2 = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('success');
  });

  document.addEventListener('contextmenu', () => {
    event.preventDefault();
    resolve('success');
  });
});

const promise3 = new Promise(resolve => {
  let leftButton;
  let rigthButton;

  document.addEventListener('click', () => {
    leftButton = true;

    if (leftButton && rigthButton) {
      resolve('success');
    }
  });

  document.addEventListener('contextmenu', () => {
    event.preventDefault();
    rigthButton = true;

    if (leftButton && rigthButton) {
      resolve('success');
    }
  });
});

promise1
  .then((res) => showMessage('First promise was resolved', res))
  .catch(showMessage);

promise2
  .then((res) => showMessage('Second promise was resolved', res))
  .catch(err => alert(err));

promise3
  .then((res) => showMessage('Third promise was resolved', res))
  .catch(err => alert(err));

function showMessage(text = 'First promise was rejected', type = 'warning') {
  body.insertAdjacentHTML(
    'beforeend',
    `
    <div data-qa='notification' class='${type}'>
      ${text}
    </div>
  `
  );
};
