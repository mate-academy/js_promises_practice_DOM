'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const firstPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }, 3000);

    document.addEventListener('click', (ev) => {
      if (ev.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
      }
    });
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener('click', (ev) => {
      if (ev.button === 0 || ev.button === 2) {
        resolve('second promise was resolved');
      }
    });
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    document.addEventListener('click', (ev) => {
      if (ev.button === 0) {
        leftClick = true;
      }

      if (ev.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('third promise was resolved');
      }
    });
  });

  const handlePromise = (promise) => {
    promise
      .then((message) => {
        const div = document.createElement('div');

        div.classList.add('success');
        div.setAttribute('data-qa', 'notification');
        div.innerText = message;

        document.body.appendChild(div);
      })
      .catch((error) => {
        const div = document.createElement('div');

        div.classList.add('error');
        div.setAttribute('data-qa', 'notification');
        div.innerText = error;

        document.body.appendChild(div);
      });
  };

  handlePromise(firstPromise);
  handlePromise(secondPromise);
  handlePromise(thirdPromise);
});
