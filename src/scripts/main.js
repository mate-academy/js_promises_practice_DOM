'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function success(result) {
  const div = document.createElement('div');

  div.textContent = result;
  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);
}

function error(e) {
  const div = document.createElement('div');

  div.textContent = e.message;
  div.classList.add('error');
  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);
}

firstPromise.then(success).catch(error);
secondPromise.then(success).catch(error);
thirdPromise.then(success).catch(error);
