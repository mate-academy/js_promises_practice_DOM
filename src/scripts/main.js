'use strict';

const body = document.getElementsByTagName('body')[0];

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(leftClickError);
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });
});

function leftClickSuccess() {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.innerText = 'First promise was resolved';
  div.className = 'success';
  body.appendChild(div);
}

function leftClickError() {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.innerText = 'First promise was rejected';
  div.className = 'error';
  body.appendChild(div);
}

function anyClickSuccess() {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.innerText = 'Second promise was resolved';
  div.className = 'success';
  body.appendChild(div);
}

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

function bothClickSucces() {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.innerText = 'Third promise was resolved';
  div.className = 'success';
  body.appendChild(div);
}

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkResolve() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }
    checkResolve();
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      rightClicked = true;
    }
    checkResolve();
  });
});

firstPromise.then(leftClickSuccess).catch(leftClickError);
secondPromise.then(anyClickSuccess);
thirdPromise.then(bothClickSucces).catch('error');
