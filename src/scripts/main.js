'use strict';

const body = document.querySelector('body');
const firstSuccess = document.createElement('div');

firstSuccess.setAttribute('style',
  `display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  height: 70px;
  width: 400px;
  border-radius: 15px;
  position: absolute;
  top: 10%;
  right: 10%;
  background-color: yellow;
`);
firstSuccess.setAttribute('data-qa', 'notification');
firstSuccess.classList.add('success');
firstSuccess.innerText = 'First promise was resolved';

const firstError = document.createElement('div');

firstError.classList.add('warning');
firstError.setAttribute('data-qa', 'notification');
firstError.innerText = 'First promise was rejected';

firstError.setAttribute('style',
  `display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  height: 70px;
  width: 400px;
  border-radius: 15px;
  position: absolute;
  top: 30%;
  right: 10%;
  background-color: red;
`);

const secondSuccess = document.createElement('div');

secondSuccess.classList.add('success');

secondSuccess.setAttribute('style',
  `display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  height: 70px;
  width: 400px;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  right: 10%;
  background-color: yellowgreen;
`);
secondSuccess.innerText = 'Second promise was resolved';
secondSuccess.setAttribute('data-qa', 'notification');

const thirdSuccess = document.createElement('div');

function createThirdElement() {
  thirdSuccess.classList.add('success');

  thirdSuccess.setAttribute('style',
    `display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  height: 70px;
  width: 400px;
  border-radius: 15px;
  position: absolute;
  top: 70%;
  right: 10%;
  background-color: green;
`);
  thirdSuccess.innerText = 'Third promise was resolved';
  thirdSuccess.setAttribute('data-qa', 'notification');
};

function delay(ms) {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', e1 => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, ms);
  });
}

const firstPromise = delay(3000);

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', e2 => {
    if (e2.button !== 1) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  document.addEventListener('mousedown', ev => {
    if (ev.button === 0) {
      document.addEventListener('mousedown', evt => {
        if (evt.button === 2) {
          createThirdElement();
          resolve('Third promise was resolved');
        }
      });
    }

    if (ev.button === 2) {
      document.addEventListener('mousedown', evt2 => {
        if (evt2.button === 0) {
          createThirdElement();
          resolve('Third promise was resolved');
        }
      });
    }
  });
});

firstPromise
  .then(success => {
    body.appendChild(firstSuccess);
  }).catch(() => {
    body.appendChild(firstError);
  });

secondPromise
  .then(success2 => {
    body.appendChild(secondSuccess);
  });

thirdPromise
  .then(success3 => {
    body.appendChild(thirdSuccess);
  });
