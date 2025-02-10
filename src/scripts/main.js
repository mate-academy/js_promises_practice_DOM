'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  setTimeout(() => {
    if (!isResolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  document.addEventListener('click', (e) => {
    isResolved = true;
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const events = [];

  document.addEventListener('click', (e) => {
    events.push('click');

    if (events.includes('contextmenu')) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    events.push('contextmenu');

    if (events.includes('click')) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((result) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = result;
    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.textContent = error;
    document.body.appendChild(div);
  });

secondPromise
  .then((result) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = result;
    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.textContent = error;
    document.body.appendChild(div);
  });

thirdPromise
  .then((result) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = result;
    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.textContent = error;
    document.body.appendChild(div);
  });
