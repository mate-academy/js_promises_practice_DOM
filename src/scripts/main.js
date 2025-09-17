'use strict';

const doc = document;

const firstPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve('First promise was resolved');
    doc.removeEventListener('click', () => {});
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    doc.removeEventListener('click', () => {});
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  doc.addEventListener('click', () => {
    resolve('Second promise was resolved');
    doc.removeEventListener('click', () => {});
  });

  doc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    doc.removeEventListener('contextmenu', () => {});
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  doc.addEventListener('click', (e) => {
    leftClick = true;
    checkingBoth();
  });

  doc.addEventListener('contextmenu', (e2) => {
    e2.preventDefault();
    rightClick = true;
    checkingBoth();
  });

  const checkingBoth = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      doc.removeEventListener('click', () => {});
      doc.removeEventListener('contexmenu', () => {});
    }
  };
});

function successHandler(message) {
  const div = document.createElement('div');

  div.className = `success`;
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.appendChild(div);
}

function errorHandler(message) {
  const div = document.createElement('div');

  div.className = 'error';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.appendChild(div);
}

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
