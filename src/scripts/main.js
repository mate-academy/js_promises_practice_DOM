'use strict';

const body = document.body;
const promiseStateValues = {
  Success: 'success',
  Warning: 'warning',
};

const createDiv = (state, text) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = text;

  switch (state) {
    case promiseStateValues.Success:
      div.classList.add(promiseStateValues.Success);
      break;

    case promiseStateValues.Warning:
      div.classList.add(promiseStateValues.Warning);
      break;
  }

  return div;
};

function getPromiseResultString(state, promiseNumber) {
  let promiseResultStr;

  switch (promiseNumber) {
    case 1:
      promiseResultStr = 'First';
      break;

    case 2:
      promiseResultStr = 'Second';
      break;

    case 3:
      promiseResultStr = 'Third';
      break;
  }

  switch (state) {
    case promiseStateValues.Success:
      promiseResultStr += ' promise was resolved!';
      break;

    case promiseStateValues.Warning:
      promiseResultStr += ' promise was rejected!';
      break;
  }

  return promiseResultStr;
}

const successHandler = (elem, text) => {
  elem.append(createDiv(promiseStateValues.Success, text));
};

const errorHandler = (elem, text) => {
  elem.append(createDiv(promiseStateValues.Warning, text));
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(getPromiseResultString(promiseStateValues.Success, 1));
  });

  setTimeout(() => reject(
    getPromiseResultString(promiseStateValues.Warning, 1)
  ), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const secondPromiseResolver = () => {
    resolve(getPromiseResultString(promiseStateValues.Success, 2));
  };

  document.addEventListener('click', () => {
    secondPromiseResolver();
  });

  document.addEventListener('contextmenu', () => {
    secondPromiseResolver();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const buttonsClicked = {
    left: false,
    right: false,
  };

  const thirdPromiseResolver = () => {
    if (buttonsClicked.left && buttonsClicked.right) {
      resolve(getPromiseResultString(promiseStateValues.Success, 3));
    }
  };

  document.addEventListener('click', () => {
    buttonsClicked.left = true;
    thirdPromiseResolver();
  });

  document.addEventListener('contextmenu', () => {
    buttonsClicked.right = true;
    thirdPromiseResolver();
  });
});

firstPromise
  .then(result => successHandler(body, result))
  .catch(result => errorHandler(body, result));

secondPromise.then(result => successHandler(body, result));
thirdPromise.then(result => successHandler(body, result));
