'use strict';

// Перша обіцянка (promise1)
const promise1 = new Promise((resolve, reject) => {
  let isClicked = false;

  // Слухаємо кліки на документі
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      isClicked = true;
      resolve('First promise was resolved on left click');
    } else if (e.button === 2) {
      isClicked = true;
      resolve('First promise was resolved on right click');
    }
  });

  // Таймер на 3 секунди, якщо не було кліку
  setTimeout(() => {
    if (!isClicked) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected after 3 seconds without a click');
    }
  }, 3000);
});

// Друга обіцянка (promise2)
const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (em) => {
    em.preventDefault();

    if (em.button === 2) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Second promise was resolved Right');
    }
  });
});

// Третя обіцянка (promise3)
const promise3 = new Promise((resolve, reject) => {
  let isClickedLeft = false;
  let isClickedRight = false;

  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      isClickedLeft = true;
      check();
    }
  });

  document.addEventListener('contextmenu', (em) => {
    em.preventDefault();

    if (em.button === 2) {
      isClickedRight = true;
      check();
    }
  });

  function check() {
    if (isClickedLeft && isClickedRight) {
      resolve('3 promis resolve');
    }
  }
});

promise1
  .then((message) => {
    const divE = document.createElement('div');

    divE.textContent = message;
    divE.className = 'success';
    divE.dataset.qa = 'notification';
    document.body.appendChild(divE);
  })
  .catch((error) => {
    const divE = document.createElement('div');

    divE.textContent = error;
    divE.className = 'error';
    divE.dataset.qa = 'notification';
    document.body.appendChild(divE);
  });

// promise2
promise2
  .then((message) => {
    const divE = document.createElement('div');

    divE.textContent = message;
    divE.className = 'success';
    divE.dataset.qa = 'notification';
    document.body.appendChild(divE);
  })
  .catch((error) => {
    const divE = document.createElement('div');

    divE.textContent = error;
    divE.className = 'error';
    divE.dataset.qa = 'notification';
    document.body.appendChild(divE);
  });

// promise3
promise3
  .then((message) => {
    const divE = document.createElement('div');

    divE.textContent = message;
    divE.className = 'success';
    divE.dataset.qa = 'notification';
    document.body.appendChild(divE);
  })
  .catch((error) => {
    const divE = document.createElement('div');

    divE.textContent = error;
    divE.className = 'error';
    divE.dataset.qa = 'notification';
    document.body.appendChild(divE);
  });
