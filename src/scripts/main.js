'use strict';

const body = document.querySelector('body');
const success = 'success';
const warning = 'warning';

const firstPromise = new Promise((resolve, reject) => {
  const click = 'click';

  body.addEventListener(click, () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const clickRight = 'contextmenu';
  const click = 'click';

  body.addEventListener('mousedown', () => {
    if (click && clickRight) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const clickRight = 'contextmenu';
  const click = 'click';

  // body.onclick = (e) => {
  //   console.log(onclick);

  //   if (!oncontextmenu) {
  //     return;
  //   }
  //   resolve('Third promise was resolved');
  // };

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  body.addEventListener('mousedown', () => {
    let x = false;
    let y = false;

    if (click) {
      x = true;
    }

    if (clickRight) {
      y = true;
    }

    if (!x === true && !y === true) {
      return;
    }
    resolve('Third promise was resolved');
  });
});

function massagePromise(message, x) {
  const massege = document.createElement('div');

  massege.classList = x;
  massege.setAttribute('data-qa', 'notification');
  massege.textContent = message;
  body.append(massege);
}

firstPromise
  .then(massagePromise, success)
  .catch(massagePromise, warning);

secondPromise
  .then(massagePromise, success);

thirdPromise
  .then(massagePromise, success);
