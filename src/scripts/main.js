'use strict';

const createDiv1 = (text) => {
  const body = document.querySelector('body');
  const newDiv = document.createElement('div');
  const oldMessage = body.querySelector('.message1');

  if (oldMessage) {
    oldMessage.remove();
  }

  newDiv.className = 'message message1';
  newDiv.innerHTML = text;
  body.append(newDiv);
};

const createDiv2 = (text) => {
  const body = document.querySelector('body');
  const newDiv = document.createElement('div');

  newDiv.className = 'message message2';
  newDiv.innerHTML = text;
  body.append(newDiv);
};

const createDiv3 = (text) => {
  const body = document.querySelector('body');
  const newDiv = document.createElement('div');

  newDiv.className = 'message message3';
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
    resolve();
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
  .then(onSuccess1, onError);

promise2
  .then(onSuccess2);

promise3
  .then(onSuccess3);

function onSuccess1() {
  createDiv1(`First promise was resolved!`);
}

function onSuccess2() {
  createDiv2(`Second promise was resolved!`);
}

function onSuccess3() {
  createDiv3(`Third promise was resolved!`);
}

function onError() {
  createDiv1(`First promise was rejected!`);
}
