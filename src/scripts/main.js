'use strict';

const body = document.querySelector('body');

function addMessage (classList, text, top, color) {
  const message = document.createElement('div');
  message.setAttribute('style',
    `display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    height: 70px;
    width: 400px;
    border-radius: 15px;
    position: absolute;
    right: 10%;
  `);

  message.setAttribute('data-qa', 'notification');
  message.style.top = top;
  message.style.backgroundColor = color;
  message.innerText = text;
  message.classList.add(classList);

  return message;
}

function delay(ms) {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', e1 => {
      const resolved = addMessage(
        'success', 'First promise was resolved',
        '10%', 'yellow'
      )
      resolve(resolved);
    });

    setTimeout(() => {
      const rejected = addMessage(
        'warning', 'First promise was rejected',
        '10%', 'red'
      )
      reject(rejected);
    }, ms);
  });
}

const firstPromise = delay(3000);

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', e2 => {
    if (e2.button !== 1) {
      const resolved = addMessage(
        'success', 'Second promise was resolved',
        '30%', 'yellowgreen'
      );

      resolve(resolved);
    }
  });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise(resolve => {
  document.addEventListener('mousedown', ev => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick === true && rightClick === true) {
      const resolved = addMessage(
        'success', 'Third promise was resolved',
        '50%', 'green'
      );

      resolve(resolved);
    }
  });
});

firstPromise
  .then(success => {
    body.appendChild(success);
  }).catch((error) => {
    body.appendChild(error);
  });

secondPromise
  .then(success2 => {
    body.appendChild(success2);
  });

thirdPromise
  .then(success3 => {
    body.appendChild(success3);
  });
