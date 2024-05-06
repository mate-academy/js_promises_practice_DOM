'use strict';

const body = document.body;

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function addNoteOnSuccess(content) {
  const note = document.createElement('div');

  note.dataset.qa = 'notification';
  note.classList.add('success');
  note.textContent = content;

  body.append(note);
}

function addNoteOnError(content) {
  const note = document.createElement('div');

  note.dataset.qa = 'notification';
  note.classList.add('error');
  note.textContent = content;

  body.append(note);
}

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftClick = true;

      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(addNoteOnSuccess).catch(addNoteOnError);
secondPromise.then(addNoteOnSuccess);
thirdPromise.then(addNoteOnSuccess);
