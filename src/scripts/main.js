'use strict';

const body = document.querySelector('body');
const div = document.createElement('div');

div.classList.add('data-qa="notification"');

div.innerHTML = `
  <div class="success">Success: First promise was resolved</div>
  <div class="error">Error: First promise was rejected</div>
  <div class="sec-success">Success: Second promise was resolved</div>
  <div class="third-success">Success: Third promise was resolved</div>
`;
body.append(div);

const success = body.querySelector('.success');
const error = body.querySelector('.error');
const second = body.querySelector('.sec-success');
const third = body.querySelector('.third-success');

second.style.display = 'none';
third.style.display = 'none';
success.style.display = 'none';
error.style.display = 'none';

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', (e) => {
    if (!e.button) {
      return;
    }

    resolve(success.style.display = '');
  });

  setTimeout(() => {
    reject(new Error(error.style.display = ''));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        resolve(second.style.display = '');
        break;
      case 2:
        resolve(second.style.display = '');
        break;
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let isLeftButtonClicked = true;
  let isRightButtonClicked = true;

  body.addEventListener('mousedown', (e) => {
    if (e.button !== 0) {
      isLeftButtonClicked = false;
    }

    if (e.button !== 2) {
      isRightButtonClicked = false;
    }

    if (!isLeftButtonClicked && !isRightButtonClicked) {
      resolve(third.style.display = '');
    }
  });
});

Promise.all([firstPromise, secondPromise, thirdPromise])
  .then(data => data)
  .catch(rec => rec);
