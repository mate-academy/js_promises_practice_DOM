'use strict';

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('something bad happened'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve();
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve();
    });
  });
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.dataset.qa = 'notification';
    div.textContent = 'First promise was resolved';
    document.querySelector('body').append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.classList.add('warning');
    div.dataset.qa = 'notification';
    div.textContent = 'First promise was rejected';
    document.querySelector('body').append(div);
  });

secondPromise.then(() => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.dataset.qa = 'notification';
  div.textContent = 'Second promise was resolved';
  document.querySelector('body').append(div);
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.dataset.qa = 'notification';
  div.textContent = 'Third promise was resolved';
  document.querySelector('body').append(div);
});
