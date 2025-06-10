'use strict';

const doc = document.querySelector('html');

function createDiv(type, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  div.className = type;

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error());
  }, 3000);

  doc.addEventListener('click', () => {
    resolve();
  });
});

firstPromise.then(() => {
  createDiv('success', 'First promise was resolved');
});

firstPromise.catch(() => {
  createDiv('error', 'First promise was rejected');
});

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('mousedown', () => {
    resolve();
  });
});

secondPromise.then(() => {
  createDiv('success', 'Second promise was resolved');
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
  createDiv('success', 'Third promise was resolved');
});
