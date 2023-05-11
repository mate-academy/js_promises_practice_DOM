'use strict';

const createDiv = (text, classes) => {
  const body = document.querySelector('body');
  const newDiv = document.createElement('div');

  newDiv.className = classes;
  newDiv.innerHTML = text;
  body.append(newDiv);
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve(`First promise was resolved!`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected!`));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve(`Second promise was resolved!`);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(`Second promise was resolved!`);
  });
});

const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve(`Third promise was resolved!`);
    });
  });
});

promise1
  .then(result => onSuccess1(result), onError);

promise2
  .then(result => onSuccess2(result));

promise3
  .then(result => onSuccess3(result));

function onSuccess1(res) {
  createDiv(res, 'message message1');
}

function onSuccess2(res) {
  createDiv(res, 'message message2');
}

function onSuccess3(res) {
  createDiv(res, 'message message3');
}

function onError(res) {
  createDiv(res, 'message message1');
}
