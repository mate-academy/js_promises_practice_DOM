'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');

    div.className = 'success';

    div.innerHTML = 'First promise was resolved';

    document.body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');

    div.className = 'error';

    div.innerHTML = 'First promise was rejected';

    document.body.append(div);
  });

secondPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = 'success';

  div.innerHTML = 'Second promise was resolved';

  document.body.append(div);
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = 'success';

  div.innerHTML = 'Third promise was resolved';

  document.body.append(div);
});
