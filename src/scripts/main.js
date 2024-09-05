'use strict';

const promise1 = new Promise((resolve, reject) => {
  let isClicked = false;

  document.addEventListener('click', () => {
    isClicked = true;
    resolve();
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(Error('First promise was not resolved'));
    }
  }, 3000);
});

promise1
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

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

promise2.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Second promise was resolved';
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  document.body.append(div);
});

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

promise3.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Third promise was resolved';
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  document.body.append(div);
});
