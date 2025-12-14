'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('html');

  doc.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'success';
    div.textContent = 'First promise was resolved';
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'error';
    div.textContent = 'First promise was rejected';
    document.body.appendChild(div);
  });

const secondPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('html');

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });

  doc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

secondPromise
  .then(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'success';
    div.textContent = 'Second promise was resolved';
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'error';
    document.body.appendChild(div);
  });

const thirdPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('html');

  let leftClick = false;
  let rigthClick = false;

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rigthClick = true;
    }

    if (leftClick === true && rigthClick === true) {
      resolve();
    }
  });

  doc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

thirdPromise
  .then(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'success';
    div.textContent = 'Third promise was resolved';
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'error';
    document.body.appendChild(div);
  });
