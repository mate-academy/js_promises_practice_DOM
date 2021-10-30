'use strict';

const body = document.querySelector('body');

document.addEventListener('contextmenu', ev => ev.preventDefault());

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftMouseClick = false;
  let rightMouseClick = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftMouseClick = true;
    }

    if (e.button === 2) {
      rightMouseClick = true;
    }

    if (leftMouseClick && rightMouseClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(success => {
  return globalAdding(success, 'success');
})
  .catch(error => {
    return globalAdding(error, 'error');
  });

secondPromise.then(success => {
  return globalAdding(success, 'success');
});

thirdPromise.then(success => {
  return globalAdding(success, 'success');
});

function globalAdding(result, final) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList = `${final}`;
  div.innerHTML = `${result}`;
  body.append(div);
}
