'use strict';

document.documentElement.oncontextmenu = () => {
  event.preventDefault();
};

const promise1 = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let buttonValue;

  document.documentElement.addEventListener('mousedown', () => {
    if (event.button !== buttonValue && buttonValue !== undefined) {
      resolve('Third promise was resolved');
    } else {
      buttonValue = event.button;
    }
  });
});

promise1.then(result => showResult(result, 50));
promise1.catch(error => showResult(error, 50, true));
promise2.then(result => showResult(result, 200));
promise3.then(result => showResult(result, 350));

function showResult(result, topPosition, warning) {
  const message = document.createElement('div');

  message.innerHTML = `
    <div data-qa="notification" class ="success" style ="top: ${topPosition}px">
      ${result}
    <div>
  `;

  if (warning) {
    message.classList.add('warning');
  }
  document.body.append(message);
}
