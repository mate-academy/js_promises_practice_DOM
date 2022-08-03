'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const SecondPromise = new Promise((resolve) => {

  body.addEventListener('contextmenu', () => {
    resolve();
  });

  body.addEventListener('click', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  body.addEventListener('click', (e) => {
    if (e) {
      body.addEventListener('contextmenu', () => {
        resolve();
      });
    }
  });

  body.addEventListener('contextmenu', (e) => {
    if (e) {
      body.addEventListener('click', () => {
        resolve();
      });
    }
  });
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.innerHTML = 'First promise was resolved';
    div.setAttribute('data-qa', 'notification');
    div.className = `success`;
    document.body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.innerHTML = 'First promise was rejected';
    div.setAttribute('data-qa', 'notification');
    div.className = `warning`;
    document.body.append(div);
  });

SecondPromise
  .then(() => {
    const div = document.createElement('div');

    div.innerHTML = 'Second promise was resolved';
    div.setAttribute('data-qa', 'notification');
    div.className = `success`;
    document.body.append(div);
  });

thirdPromise
  .then(() => {
    const div = document.createElement('div');

    div.innerHTML = 'Third promise was resolved';
    div.className = `success`;
    div.setAttribute('data-qa', 'notification');
    document.body.append(div);
  });
