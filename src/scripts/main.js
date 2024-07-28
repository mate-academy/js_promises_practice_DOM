'use strict';

let leftClick = false;
let rigthClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((data) => {
    showPositiveResult(data);
  })
  .catch((info) => {
    showNegativeResult(info);
  });

const secondPromise = new Promise(function (resolve) {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((data) => {
  showPositiveResult(data);
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rigthClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((data) => {
  showPositiveResult(data);
});

function showNegativeResult(result) {
  const dataHtml = document.createElement('div');

  dataHtml.dataset.qa = 'notification';
  dataHtml.classList.add('error');
  dataHtml.textContent = result;

  document.body.append(dataHtml);

  // setTimeout(() => {
  //   dataHtml.remove();
  // }, 3000);
}

function showPositiveResult(result) {
  const dataHtml = document.createElement('div');

  dataHtml.dataset.qa = 'notification';
  dataHtml.classList.add('success');
  dataHtml.textContent = result;

  document.body.append(dataHtml);

  // setTimeout(() => {
  //   dataHtml.remove();
  // }, 3000);
}
