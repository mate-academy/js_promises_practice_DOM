'use strict';

const logo = document.querySelector('.logo');
const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');

div1.setAttribute('data-qa', 'notification');
div2.setAttribute('data-qa', 'notification');
div3.setAttribute('data-qa', 'notification');

const successMessage = 'First promise was resolved';
const errorMessage = 'First promise was rejected';
const successMessage2 = 'Second promise was resolved';
const successMessage3 = 'Third promise was resolved';

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve(successMessage);
  });

  setTimeout(() => {
    reject(new Error(errorMessage));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  logo.addEventListener('click', () => {
    resolve(successMessage2);
  });

  logo.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve(successMessage2);
  });
});

const promise3 = new Promise((resolve) => {
  logo.addEventListener('click', () => {
    logo.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      resolve(successMessage3);
    });
  });

  logo.addEventListener('contextmenu', (ev) => {
    logo.addEventListener('click', () => {
      ev.preventDefault();
      resolve(successMessage3);
    });
  });
});

promise1
  .then(() => {
    div1.innerHTML = successMessage;
    div1.className = 'success';
    document.body.append(div1);
  })
  .catch(() => {
    div1.innerHTML = errorMessage;
    div1.className = 'warning';
    document.body.append(div1);
  });

promise2
  .then(() => {
    div2.innerHTML = successMessage2;
    div2.className = 'success';
    document.body.append(div2);
  });

promise3
  .then(() => {
    div3.innerHTML = successMessage3;
    div3.className = 'success';
    document.body.append(div3);
  });
