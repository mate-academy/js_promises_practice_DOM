'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

promise1.then(
  (result) => {
    const div = document.createElement('div');

    div.innerText = result;

    div.setAttribute('class', 'success');
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.innerText = error.message;

    div.setAttribute('class', 'error');
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  },
);

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved!');
  });
});

promise2.then((result) => {
  const div = document.createElement('div');

  div.innerText = result;

  div.setAttribute('class', 'success');
  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);
});

const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved!');
    });
  });
});

promise3.then((result) => {
  const div = document.createElement('div');

  div.innerText = result;

  div.setAttribute('class', 'success');
  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);
});
