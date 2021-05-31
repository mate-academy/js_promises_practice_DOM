'use strict';

const body = document.querySelector('body');

function promise1() {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      const message = document.createElement('div');

      message.setAttribute('data-qa', 'notification');
      message.setAttribute('class', 'success');
      message.innerText = 'First promise was resolved';

      resolve(body.appendChild(message));
    });

    setTimeout(() => {
      const message = document.createElement('div');

      message.setAttribute('data-qa', 'notification');
      message.setAttribute('class', 'warning');
      message.innerText = 'First promise was rejected';

      reject(body.appendChild(message));
    }, 3000);
  });
}

promise1();

function promise2() {
  return new Promise((resolve) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.setAttribute('class', 'success');
    message.innerText = 'Second promise was resolved';

    document.addEventListener('click', () => {
      resolve(body.appendChild(message));
      promise2();
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve(body.appendChild(message));
      promise2();
    });
  });
}

promise2();

function promise3() {
  return new Promise(resolve => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.setAttribute('class', 'success');
    message.innerText = 'Third promise was resolved';

    document.addEventListener('mousedown', e => {
      if (e.buttons === 3) {
        resolve(body.appendChild(message));
      }
    });
  });
}

promise3();
