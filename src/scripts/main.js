'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeOut);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.className = 'success';
    div.textContent = 'First promise was resolved';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.className = 'error';
    div.textContent = 'First promise was rejected';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    (e) => {
      resolve('Second promise was resolved');
      e.preventDefault();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      resolve('Second promise was resolved');
      e.preventDefault();
    },
    { once: true },
  );
});

secondPromise
  .then(() => {
    const div = document.createElement('div');

    div.className = 'success';
    div.textContent = 'Second promise was resolved';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.className = 'error';
    div.textContent = 'Second promise was rejected';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener(
    'click',
    () => {
      leftClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      rightClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

thirdPromise
  .then(() => {
    const div = document.createElement('div');

    div.className = 'success';
    div.textContent = 'Third promise was resolved';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.className = 'error';
    div.textContent = 'Third promise was rejected';
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  });
