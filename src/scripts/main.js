'use strict';

const doc = document.querySelector('html');

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error());
  }, 3000);

  doc.addEventListener('click', () => {
    resolve();
  });
});

firstPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = 'First promise was resolved';
  div.className = 'success';

  document.body.appendChild(div);
});

firstPromise.catch(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = 'First promise was rejected';
  div.className = 'error';

  document.body.appendChild(div);
});

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('mousedown', () => {
    resolve();
  });
});

secondPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = 'Second promise was resolved';
  div.className = 'success';
  document.body.appendChild(div);
});

const thirdPromise = new Promise((resolve) => {
  const leftClickDone = { done: false };
  const rightClickDone = { done: false };

  doc.addEventListener('mousedown', (clk) => {
    if (clk.button === 0) {
      leftClickDone.done = true;
    }

    if (clk.button === 2) {
      rightClickDone.done = true;
    }

    if (leftClickDone.done && rightClickDone.done) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = 'Third promise was resolved';
  div.className = 'success';

  document.body.appendChild(div);
});
