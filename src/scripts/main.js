'use strict';

const messageBlock = document.getElementById('message');

messageBlock.style.position = 'fixed';
messageBlock.style.top = `10px`;
messageBlock.style.right = `10px`;

// document.body.prepend(messageBlock);

const pushNotification = (description, type, id) => {
  const div = document.getElementById(id);

  div.classList.add(type, 'message');
  // div.setAttribute('data-qa', 'notification');
  div.textContent = `${description}`;
  // messageBlock.append(div);
};

const logo = document.querySelector('.logo');

// #1

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve('Clicked');
  });

  setTimeout(() => {
    reject(new Error('Error'));
  }, 3000);
});

promise1
  .then(() => {
    pushNotification('First promise was resolved!', 'success', 'promise1');
  })
  .catch(() => {
    pushNotification('First promise was rejected!', 'warning', 'promise1');
  });

// #2

const promise2 = new Promise((resolve) => {
  logo.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.which === 1 || e.which === 3) {
      resolve('Clicked');
    }
  });
});

promise2
  .then(() => {
    pushNotification('Second promise was resolved!', 'success', 'promise2');
  });

const promise3 = new Promise((resolve) => {
  let left = false;
  let right = false;

  logo.addEventListener('mousedown', (e) => {
    if (e.which === 1) {
      left = true;
    }

    if (e.which === 3) {
      right = true;
    }

    if (left === true && right === true) {
      resolve('Clicked');
    }
  });
});

promise3
  .then(() => {
    pushNotification('Third promise was resolved!', 'success', 'promise3');
  });
