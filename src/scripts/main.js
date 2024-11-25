'use strict';

const promise1 = new Promise(function (resolve, reject) {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

promise1.then(
  (result) => handleMessageText(result),

  (error) => {
    handleMessageText(error).className = 'error';
  },
);

const promise2 = new Promise((resolve) => {
  document.addEventListener('contextmenu', prom2Text);
  document.addEventListener('click', prom2Text);

  function prom2Text() {
    return resolve('Second promise was resolved');
  }
});

promise2.then((result) => handleMessageText(result));

Promise.all([
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve();
    });
  }),
  new Promise((resolve) => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  }),
]).then((result) => {
  handleMessageText(result).textContent = `Third promise was resolved`;
});

function handleMessageText(text) {
  const div = document.createElement('div');

  div.textContent = text;
  div.dataset.qa = 'notification';
  document.body.appendChild(div);
  div.className = 'success';

  return div;
}
