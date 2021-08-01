'use strict';

let leftButton = false;
let rightButton = false;

document.addEventListener('contextmenu', e => e.preventDefault());

const clickResolved = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const leftOrRightClickResolved = new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    if (e.which === 1 || e.which === 3) {
      resolve('Second promise was resolved');
    }
  });
});

const bothClickResolved = new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    if (e.which === 1) {
      leftButton = true;
    }

    if (e.which === 3) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

const createBlock = (param) => {
  const div = document.createElement('div');

  div.innerHTML = param;
  div.setAttribute('data-qa', param);
  document.body.append(div);
  div.classList.add('message');

  if (typeof param === 'object') {
    div.classList.add('warning');
  } else if (param.includes('Second')) {
    div.classList.add('distance');
  } else if (param.includes('Third')) {
    div.classList.add('distance__third');
  } else {
    div.classList.add('success');
  }
};

clickResolved.then(createBlock).catch(createBlock);
leftOrRightClickResolved.then(createBlock);
bothClickResolved.then(createBlock);
