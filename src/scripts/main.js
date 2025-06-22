'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');

    clearTimeout(timer);
  });
});

const secondPromise = new Promise((resolve) => {
  function handler() {
    resolve('Second promise was resolved');
    document.body.removeEventListener('click', handler);
    document.body.removeEventListener('contextmenu', handler);
  }

  document.body.addEventListener('click', handler);

  document.body.addEventListener('contextmenu', handler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClick() {
    if (leftClicked && rightClicked) {
    resolve('Third promise was resolved');
  }
  }

  document.body.addEventListener('click', (e) => {
      leftClicked = true;
      checkBothClick();

  });

  document.body.addEventListener('contextmenu', (e) => {
      rightClicked = true;
      checkBothClick()

  });
});

function error(msg) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = msg;
  document.body.append(div);
}

firstPromise
  .then((success) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = 'First promise was resolved';
    document.body.append(div);
  })
  .catch(error);

secondPromise.then((success) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = 'Second promise was resolved';
  document.body.append(div);
});

thirdPromise.then((success) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = 'Third promise was resolved';
  document.body.append(div);
});
