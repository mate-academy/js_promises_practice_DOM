'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.querySelector('.logo').addEventListener('click', function() {
    resolve();
  });

  setTimeout(() => reject(new Error('promise was rejected')), 3000);
});

firstPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.innerText = 'First promise was resolved';
  document.body.append(div);
});

firstPromise.catch(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'warning';
  div.innerText = 'First promise was rejected';
  document.body.append(div);
});

const secondPromise = new Promise((resolve, reject) => {
  document.querySelector('body').addEventListener('click', function() {
    resolve();
  });

  document.querySelector('body').addEventListener('contextmenu', function() {
    resolve();
  });
});

secondPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.innerText = 'Second promise was resolved';
  document.body.append(div);
});

const thirdPromise = new Promise((resolve, reject) => {
  document.querySelector('body').addEventListener('click', function() {
    document.querySelector('body').addEventListener('contextmenu', function() {
      resolve();
    });
  });

  document.querySelector('body').addEventListener('contextmenu', function() {
    document.querySelector('body').addEventListener('click', function() {
      resolve();
    });
  });
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.innerText = 'Third promise was resolved';
  document.body.append(div);
});
