'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('Timeout error'));
  }, 3000);

  logo.addEventListener('click', () => {
    clearTimeout(timer);
    resolve();
  });
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.className = 'message success';
    div.dataset.qa = 'notification';
    div.textContent = 'First promise was resolved';
    document.body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.className = 'message error';
    div.dataset.qa = 'notification';
    div.textContent = 'First promise was rejected';
    document.body.append(div);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

secondPromise.then(() => {
  const div = document.createElement('div');

  div.className = 'message success';
  div.dataset.qa = 'notification';
  div.textContent = 'Second promise was resolved';
  document.body.append(div);
});

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve();
    },
    { once: true },
  );
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve();
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]);

thirdPromise
  .then(() => {
    const div = document.createElement('div');

    div.className = 'message success';
    div.dataset.qa = 'notification';
    div.textContent = 'Third promise was resolved';
    document.body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.className = 'message error';
    div.dataset.qa = 'notification';
    div.textContent = 'Third promise was rejected';
    document.body.append(div);
  });
