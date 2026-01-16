'use strict';

const doc = document;

const promise1 = new Promise((resolve, reject) => {
  doc.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve(e);
    }
  });

  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  doc.addEventListener('click', (c) => {
    resolve(c);
  });

  doc.addEventListener('contextmenu', (c) => {
    c.preventDefault();
    resolve(c);
  });
});

const promise3 = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    doc.addEventListener('contextmenu', (b) => {
      b.preventDefault();
      resolve(b);
    });
  });

  doc.addEventListener('contextmenu', () => {
    doc.addEventListener('click', (d) => {
      d.preventDefault();
      resolve(d);
    });
  });
});

promise1
  .then(() => notification('First promise was resolved'))

  .catch(() => notification('First promise was rejected', 'error'));

promise2.then(() => notification('Second promise was resolved'));

promise3.then(() => notification('Third promise was resolved'));

function notification(message, type = 'success') {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
}
