'use strict';

const body = document.body;

const messageForPage = (text, isError) => {
  const div = document.createElement('div');

  div.className = isError ? 'error' : 'success';
  div.textContent = `${text}`;
  div.dataset.qa = 'notification';
  body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(
    () => reject(Error('First promise was rejected')),
    3000,
  );

  body.addEventListener('click', () => {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  const getResolve = (e) =>
    body.addEventListener(e, () => resolve('Second promise was resolved'));

  getResolve('click');
  getResolve('contextmenu');
});

const thirdPromise = new Promise((resolve) => {
  const getResolve = (firstEvent, secendEvent) =>
    body.addEventListener(firstEvent, () => {
      body.addEventListener(secendEvent, () => {
        resolve('Third promise was resolved');
      });
    });

  getResolve('click', 'contextmenu');
  getResolve('contextmenu', 'click');
});

firstPromise
  .then((success) => messageForPage(success))
  .catch((error) => messageForPage(error, true));

secondPromise.then((success) => messageForPage(success));

thirdPromise.then((success) => messageForPage(success));
