'use strict';

const alertMessage = document.createElement('span');
const leftCLickResolver = (resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(reject, 2000);
};

const leftOrRightResolver = (resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
};

const bothClickResolver = (resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 3) {
      resolve();
    }
  });
};

const promiseLeftClicked = new Promise(leftCLickResolver);
const promiseLeftOrRightClick = new Promise(leftOrRightResolver);
const promiseBothClicled = new Promise(bothClickResolver);

promiseLeftClicked
  .then(result => {
    alertMessage.classList.add('success');
    alertMessage.setAttribute('data-qa', 'notification');
    alertMessage.innerHTML = 'First promise was resolved';
    document.body.append(alertMessage);
  })
  .catch(result => {
    alertMessage.classList.add('warning');
    alertMessage.setAttribute('data-qa', 'notification');
    alertMessage.innerHTML = 'First promise was rejected';
    document.body.append(alertMessage);
  });

promiseLeftOrRightClick
  .then(result => {
    alertMessage.classList.add('success');
    alertMessage.setAttribute('data-qa', 'notification');
    alertMessage.innerHTML = 'Second promise was resolved';
    document.body.append(alertMessage);
  });

promiseBothClicled
  .then(result => {
    alertMessage.classList.add('success');
    alertMessage.setAttribute('data-qa', 'notification');
    alertMessage.innerHTML = 'Third promise was resolved';
    document.body.append(alertMessage);
  });
