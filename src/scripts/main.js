'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timeout = setTimeout(reject, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeout);
    resolve();
  });
});
const promise2 = new Promise((resolve) => {
  document.addEventListener('contextmenu', (even) => {
    even.preventDefault();
    resolve();
  });

  document.addEventListener('click', resolve);
});
const promise3 = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('contextmenu', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });

  document.addEventListener('click', () => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

promise1
  .then(() => {
    const errorDiv = document.createElement('div');

    errorDiv.className = 'success';
    errorDiv.setAttribute('data-qa', 'notification');
    errorDiv.textContent = 'First promise was resolved';
    document.body.appendChild(errorDiv);
  })
  .catch(() => {
    const errorDiv = document.createElement('div');

    errorDiv.className = 'error';
    errorDiv.setAttribute('data-qa', 'notification');
    errorDiv.textContent = 'First promise was rejected';
    document.body.appendChild(errorDiv);
  });

promise2.then(() => {
  const errorDiv = document.createElement('div');

  errorDiv.className = 'success';
  errorDiv.setAttribute('data-qa', 'notification');
  errorDiv.textContent = 'Second promise was resolved';
  document.body.appendChild(errorDiv);
});

promise3.then(() => {
  const errorDiv = document.createElement('div');

  errorDiv.className = 'success';
  errorDiv.setAttribute('data-qa', 'notification');
  errorDiv.textContent = 'Third promise was resolved';
  document.body.appendChild(errorDiv);
});
