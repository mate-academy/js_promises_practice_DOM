'use strict';

function addMessage(message, type) {
  const div = document.createElement('div');

  div.classList.add(type);
  div.textContent = message;
  div.setAttribute(`data-cy`, 'notification');

  document.body.append(div);
}

const promise1 = new Promise(function(resolve, reject) {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved!`);
  });

  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);
});

promise1.then(resolution => {
  addMessage(resolution, 'success');
}).catch(rejection => {
  addMessage(rejection, 'warning');
});

const promise2 = new Promise(function(resolve) {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', () => {
    resolve(`Second promise was resolved`);
  });
});

promise2.then(resolution => {
  addMessage(resolution, 'success');
});

const promise3 = new Promise(function(resolve) {
  let left = false;
  let right = false;

  document.addEventListener('click', () => {
    left = true;

    if (right) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('contextmenu', () => {
    right = true;

    if (left) {
      resolve(`Third promise was resolved`);
    }
  });
});

promise3.then(resolution => {
  addMessage(resolution, 'success');
});
