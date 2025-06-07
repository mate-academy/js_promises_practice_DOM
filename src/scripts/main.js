'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  const firstPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    const clickHandler = (e) => {
      if (e.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
        body.removeEventListener('mousedown', clickHandler);
      }
    };

    body.addEventListener('mousedown', clickHandler);
  });

  firstPromise
    .then(() => {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add('success');
      div.textContent = 'First promise was resolved';
      body.appendChild(div);
    })
    .catch(() => {
      const div = document.createElement('div');

      div.textContent = 'First promise was rejected';
      div.classList.add('error');
      div.setAttribute('data-qa', 'notification');
      body.appendChild(div);
    });

  const secondPromise = new Promise((resolve) => {
    const clickHandler = (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }

      body.removeEventListener('mousedown', clickHandler);
      body.removeEventListener('mouseup', clickHandler);
    };

    body.addEventListener('mousedown', clickHandler);
    body.addEventListener('mouseup', clickHandler);
  });

  secondPromise.then(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = 'First promise was resolved';
    body.appendChild(div);
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    const clickHandler = (e) => {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        body.removeEventListener('mousedown', clickHandler);
      }
    };

    body.addEventListener('mousedown', clickHandler);
  });

  thirdPromise.then(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = 'First promise was resolved';
    body.appendChild(div);
  });
});
