'use strict';

const body = document.body;

const success = (numberOfPromice) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');

  div.textContent = `${numberOfPromice} promise was resolved`;

  body.append(div);
};

const error = (numberOfPromice) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');

  div.textContent = `${numberOfPromice} promise was rejected`;
  body.append(div);
};

const thenSuccess = (value) => success(value);
const catchError = (value) => error(value);

const firstPromise = new Promise((resolve, reject) => {
  const count = 'First';

  const handler = () => {
    clearTimeout(timeOut);
    resolve(count);
  };

  document.addEventListener('click', handler);

  const timeOut = setTimeout(() => {
    document.removeEventListener('click', handler);
    reject(count);
  }, 3000);
});

firstPromise.then(thenSuccess).catch(catchError);

const secondPromise = new Promise((resolve) => {
  const count = 'Second';

  ['click', 'contextmenu'].forEach((elem) => {
    document.addEventListener(elem, (eventElem) => {
      if (eventElem.button === 2) {
        eventElem.preventDefault();
      }

      resolve(count);
    });
  });
});

secondPromise.then(thenSuccess);

let click = false;
let contextmenu = false;

const thirdPromise = new Promise((resolve) => {
  const count = 'Third';

  const check = (elemEvent) => {
    if (elemEvent.type === 'click') {
      click = true;
    }

    if (elemEvent.type === 'contextmenu') {
      elemEvent.preventDefault();
      contextmenu = true;
    }

    if (click && contextmenu) {
      document.removeEventListener('click', check);
      document.removeEventListener('contextmenu', check);

      resolve(count);
    }
  };

  document.addEventListener('click', check);
  document.addEventListener('contextmenu', check);
});

thirdPromise.then(thenSuccess);
