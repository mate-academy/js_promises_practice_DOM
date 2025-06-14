'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('mousedown', (n) => {
    if (n.button === 0) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error('Some reason'));
  }, 3000);
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.className = 'success';
    div.textContent = 'First promise was resolved';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.className = 'error';
    div.setAttribute('data-qa', 'notification');
    div.textContent = 'First promise was rejected';
    document.body.appendChild(div);
  });

const secondPromise = new Promise((resolve) => {
  logo.addEventListener('mousedown', (n) => {
    if (n.button === 0) {
      resolve();
    } else if (n.button === 2) {
      resolve();
    }
  });
});

secondPromise
  .then(() => {
    const div = document.createElement('div');

    div.className = 'success';
    div.textContent = 'Second promise was resolved';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.className = 'error';
    div.setAttribute('data-qa', 'notification');
    div.textContent = 'Second promise was rejected';
    document.body.appendChild(div);
  });

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve(
        // eslint-disable-next-line max-len
        'Third promise was resolved only after both left and right clicks happened',
      );
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise
  .then(() => {
    const div = document.createElement('div');

    div.className = 'success';
    div.textContent = 'Third promise was resolved';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.className = 'error';
    div.setAttribute('data-qa', 'notification');
    div.textContent = 'Third promise was rejected';
    document.body.appendChild(div);
  });
