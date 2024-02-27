'use strict';

const SUCCES_MESSAGE = 'promise was resolved';
const ERROR_MESSAGE = 'promise was rejected';

function getPrefixFromNumber(number) {
  switch (number) {
    case 1: return 'First';
    case 2: return 'Second';
    case 3: return 'Third';
    default: return '';
  }
}

function getSuccesMessage(promiseNumber) {
  return `${getPrefixFromNumber(promiseNumber)} ${SUCCES_MESSAGE}`;
}

function getErrorMessage(promiseNumber) {
  return `${getPrefixFromNumber(promiseNumber)} ${ERROR_MESSAGE}`;
}

function appendElement(cssClass, message) {
  const element = document.createElement('DIV');

  element.className = cssClass;
  element.innerHTML = message;
  element.setAttribute('data-qa', 'notification');
  document.body.append(element);
}

function successHandler(message) {
  const cssClass = '.success';

  appendElement(cssClass, message);
}

function errorHandler(message) {
  const cssClass = '.error';

  appendElement(cssClass, message);
}

const firstPromise = () => {
  const promiseNumber = 1;
  const resolver = (resolve, reject) => {
    document.addEventListener('click', () => {
      resolve(getSuccesMessage(promiseNumber));
    });

    setTimeout(() => {
      reject(getErrorMessage(promiseNumber));
    }, 3000);
  };

  return new Promise(resolver);
};

const secondPromise = () => {
  const promiseNumber = 2;
  const resolver = resolve => {
    document.addEventListener('mouseup', e => {
      switch (e.button) {
        case 0: case 2:
          resolve(getSuccesMessage(promiseNumber));
      }
    });
  };

  return new Promise(resolver);
};

const thirdPromise = () => {
  const promiseNumber = 3;
  let isLeftClick = false;
  let isRightClick = false;

  const resolver = resolve => {
    document.addEventListener('mouseup', e => {
      switch (e.button) {
        case 0: isLeftClick = true; break;
        case 2: isRightClick = true; break;
      }

      if (isLeftClick && isRightClick) {
        resolve(getSuccesMessage(promiseNumber));
      }
    });
  };

  return new Promise(resolver);
};

firstPromise().then(successHandler).catch(errorHandler);
secondPromise().then(successHandler).catch(errorHandler);
thirdPromise().then(successHandler).catch(errorHandler);
