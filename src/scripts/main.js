'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const doc = document;

  const firstPromise = new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject(new Error('First promise was rejected.'));
    }, 3000);

    const handleClick = (e) => {
      if (e.button === 0) {
        clearTimeout(timerId);
        resolve('First promise was resolved.');
        doc.removeEventListener('mousedown', handleClick);
      }
    };

    doc.addEventListener('mousedown', handleClick);
  });

  firstPromise
    .then((message) => {
      const div = document.createElement('div');

      div.textContent = `${message}`;
      div.classList.add('success');
      div.setAttribute('data-qa', 'notification');
      document.body.appendChild(div);
    })

    .catch((error) => {
      const div = document.createElement('div');
      div.textContent = error.message;
      div.classList.add('error');
      div.setAttribute('data-qa', 'notification');
      document.body.appendChild(div);
    });

  const secondPromise = new Promise((resolve, reject) => {
    const handleClick = (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
        doc.removeEventListener('mousedown', handleClick);
        doc.removeEventListener('mouseup', handleClick);
      }
    };

    doc.addEventListener('mousedown', handleClick);
    doc.addEventListener('mouseup', handleClick);
  });

  secondPromise.then((message) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.textContent = `${message}`;
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  });

  const thirdPromise = new Promise((resolve, reject) => {
    let leftClicked = false;
    let rightClicked = false;

    const handleClick = (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        doc.removeEventListener('mousedown', handleClick);
      }
    };

    doc.addEventListener('mousedown', handleClick);
  });

  thirdPromise.then((message) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.textContent = `${message}`;
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  });
});
