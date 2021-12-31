/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable promise/param-names */
/* eslint-disable no-console */
'use strict';

const div = document.createElement('div');

div.setAttribute('data-qa', 'notification');
document.body.append(div);

const formatElement = (element, className, message) => {
  element.className = className;
  element.textContent = message;
};

const onSuccess = result => {
  const [className, message] = result;

  formatElement(div, className, message);
};

const onError = error => {
  const [className, message] = error;

  formatElement(div, className, message);
};

function wait(delay, className, value) {
  return new Promise((reject) => {
    setTimeout(() => reject([className, value]), delay);
  });
}

function click(eventType, className, value) {
  return new Promise(resolve => {
    document.addEventListener(eventType, () => {
      resolve([className, value]);
    });
  });
};

const firstPromise = Promise.race([
  wait(3000, 'error', 'First promise was rejected'),
  click('click', 'success', 'First promise was resolved'),
]);

firstPromise
  .then(onSuccess, onError);

const secondPromise = Promise.race([
  click('click', 'success', 'Second promise was resolved'),
  click('contextmenu', 'success', 'Second promise was resolved'),
]);

secondPromise
  .then(onSuccess, onError);

const thirdPromise = Promise.all([
  click('click', 'success', 'Third promise was resolved'),
  click('contextmenu', 'success', 'Third promise was resolved'),
]);

thirdPromise
  .then(value => onSuccess(value[1]), error => onError(error[1]));
