'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', () => {
    clicked = true;
    resolve();
  });

  setTimeout(() => {
    if (!clicked) {
      reject(Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.textContent = 'First promise was resolved';
    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    document.body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.textContent = 'First promise was rejected';
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    document.body.append(div);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

secondPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Second promise was resolved';
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  document.body.append(div);
});

const thirdPromise = new Promise((resolve) => {
  let leftClickOccurred = false;
  let rightClickOccured = false;

  document.addEventListener('click', () => {
    leftClickOccurred = true;

    if (leftClickOccurred && rightClickOccured) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickOccured = true;

    if (leftClickOccurred && rightClickOccured) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Third promise was resolved';
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  document.body.append(div);
});
