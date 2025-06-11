'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  let wasClicked = false;

  document.addEventListener('click', () => {
    wasClicked = true;
    resolve('First promise was resolved');
  });

  if (wasClicked === false) {
    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  }
});

firstPromise.then(() => {
  const div1 = document.createElement('div');

  div1.classList.add('success');
  div1.setAttribute('data-qa', 'notification');
  div1.textContent = 'First promise was resolved';
  body.appendChild(div1);
});

firstPromise.catch(() => {
  const div2 = document.createElement('div');

  div2.classList.add('error');
  div2.setAttribute('data-qa', 'notification');
  div2.textContent = 'First promise was rejected';
  body.appendChild(div2);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(() => {
  const div1 = document.createElement('div');

  div1.classList.add('success');
  div1.setAttribute('data-qa', 'notification');
  div1.textContent = 'Second promise was resolved';
  body.appendChild(div1);
});

secondPromise.catch(() => {
  const div2 = document.createElement('div');

  div2.classList.add('error');
  div2.setAttribute('data-qa', 'notification');
  div2.textContent = 'Second promise was rejected';
  body.appendChild(div2);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
  });

  if (leftClick && rightClick) {
    resolve('Third promise was resolved');
  }
});

thirdPromise.then(() => {
  const div1 = document.createElement('div');

  div1.classList.add('success');
  div1.setAttribute('data-qa', 'notification');
  div1.textContent = 'Third promise was resolved';
  body.appendChild(div1);
});

thirdPromise.catch(() => {
  const div2 = document.createElement('div');

  div2.classList.add('error');
  div2.setAttribute('data-qa', 'notification');
  div2.textContent = 'Third promise was rejected';
  body.appendChild(div2);
});
