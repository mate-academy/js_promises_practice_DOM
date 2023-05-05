'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const click = document.addEventListener('click', () => {
    resolve();
  });

  if (!click) {
    setTimeout((error) => {
      reject(error);
    }, 3000);
  }
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.className = 'success';
    div.textContent = 'First promise was resolved';
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.className = 'warning';
    div.textContent = 'First promise was rejected';
    document.body.appendChild(div);
  });

const secondPromise = new Promise((resolve) => {
  ['click', 'contextmenu'].forEach(e => {
    document.addEventListener(e, () => {
      resolve();
    });
  });
});

secondPromise
  .then(() => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.className = 'success';
    div.textContent = 'Second promise was resolved';
    document.body.appendChild(div);
  });

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve(true);
  });
});
const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve(true);
  });
});
const thirdPromise
  = Promise.all([leftClick, rightClick])
    .then(() => {
      const checkClicks = (leftClickNew, rightClickNew) => {
        return new Promise((resolve) => {
          if (leftClickNew && rightClickNew) {
            resolve();
          }
        });
      };

      return checkClicks;
    });

thirdPromise
  .then(() => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.className = 'success';
    div.textContent = 'Third promise was resolved';
    document.body.appendChild(div);
  });
