'use strict';

// Block of Reusable Code/Creates a div
function makeDiv(text, cssClass) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = cssClass;
  div.textContent = text;

  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

firstPromise
  .then(resolve => makeDiv(resolve, 'success'))
  .catch(reject => makeDiv(reject, 'warning'));

const secondPromise = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.documentElement.addEventListener('contextmenu', (act) => {
    act.preventDefault();
    resolve(`Second promise was resolved`);
  });
});

secondPromise
  .then(resolve => makeDiv(resolve, 'success'))
  .then(resolve => makeDiv(resolve, 'success'));

const thirdPromise = new Promise((resolve, reject) => {
  let flag = false;

  document.documentElement.addEventListener('click', () => {
    flag = true;
  });

  document.documentElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (flag === true) {
      resolve(`Third promise was resolved`);
    }
  });
});

thirdPromise.then(resolve => makeDiv(resolve, 'success'));
