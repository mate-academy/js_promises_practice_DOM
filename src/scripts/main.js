'use strict';

const successNotification = (text) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = text;
  document.body.append(div);
};

const errorNotification = (text) => {
  const div = document.createElement('div');

  div.classList.add('error');
  div.setAttribute('data-qa', 'notification');
  div.textContent = text;
  document.body.append(div);
};

const promise1 = new Promise((resolve, reject) => {
  const resolved = () => {
    resolve(`First promise was resolved`);
    clearTimeout(rejected);
  };

  document.addEventListener('click', resolved, { once: true });

  const rejected = setTimeout(() => {
    reject(new Error(`First promise was rejected`));
    document.removeEventListener('click', resolved);
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const resolved = () => {
    resolve(`Second promise was resolved`);
    document.removeEventListener('click', resolved);
  };

  document.addEventListener('click', resolved, { once: true });
  document.addEventListener('contextmenu', resolved, { once: true });
});

const promise3 = new Promise((resolve) => {
  let count = 0;

  const check = () => {
    count++;

    if (count === 2) {
      resolve(`Third promise was resolved`);
    }
  };

  document.addEventListener('click', check, { once: true });
  document.addEventListener('contextmenu', check, { once: true });
});

promise1.then(successNotification).catch(errorNotification);
promise2.then(successNotification).catch(errorNotification);
promise3.then(successNotification).catch(errorNotification);
