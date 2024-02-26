'use strict';

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
  const SUCCES_MESSAGE = 'First promise was resolved';
  const ERROR_MESSAGE = 'First promise was rejected';

  const resolver = (resolve, reject) => {
    document.addEventListener('click', () => {
      resolve(SUCCES_MESSAGE);
    });

    setTimeout(() => {
      reject(ERROR_MESSAGE);
    }, 3000);
  };

  return new Promise(resolver);
};

const secondPromise = () => {
  const SUCCES_MESSAGE = 'Second promise was resolved';

  const resolver = resolve => {
    document.addEventListener('mouseup', e => {
      switch (e.button) {
        case 0: case 2:
          resolve(SUCCES_MESSAGE);
      }
    });
  };

  return new Promise(resolver);
};

const thirdPromise = () => {
  const SUCCES_MESSAGE = 'Third promise was resolved';
  let isLeftClick = false;
  let isRightClick = false;

  const resolver = resolve => {
    document.addEventListener('mouseup', e => {
      switch (e.button) {
        case 0: isLeftClick = true; break;
        case 2: isRightClick = true; break;
      }

      if (isLeftClick && isRightClick) {
        resolve(SUCCES_MESSAGE);
      }
    });
  };

  return new Promise(resolver);
};

firstPromise().then(successHandler).catch(errorHandler);
secondPromise().then(successHandler).catch(errorHandler);
thirdPromise().then(successHandler).catch(errorHandler);
