'use strict';

function feedbackPromise() {
  let leftClicked = false;
  let rightClicked = false;

  let resolveFirst;
  let rejectFirst;
  let resolveSecond;
  let resolveThird;

  const firstPromise = new Promise((resolve, reject) => {
    resolveFirst = resolve;
    rejectFirst = reject;
  });

  const secondPromise = new Promise((resolve, reject) => {
    resolveSecond = resolve;
  });

  const thirdPromise = new Promise((resolve) => {
    resolveThird = resolve;
  });

  const checkThirdPromise = () => {
    if (leftClicked && rightClicked) {
      resolveThird(
        // eslint-disable-next-line max-len
        'Third promise was resolved only after both left and right clicks happened',
      );
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;

    resolveFirst('First promise was resolved');
    resolveSecond('Second promise was resolved');

    checkThirdPromise();
  });

  document.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();

    rightClicked = true;

    resolveSecond('Second promise was resolved');

    checkThirdPromise();
  });

  setTimeout(() => {
    if (!leftClicked) {
      rejectFirst('First promise was rejected in 3 seconds');
    }
  }, 3000);

  firstPromise
    .then((message) => showMessage(message, 'success'))
    .catch(() => showMessage('First promise was rejected', 'error'));

  secondPromise
    .then((message) => showMessage(message, 'success'))
    .catch((message) => showMessage(message, 'error'));

  thirdPromise
    .then((message) => showMessage(message, 'success'))
    .catch(() => showMessage('Third promise was resolved', 'error'));
}

const showMessage = (text, state) => {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.className = `notification ${state}`;
  message.textContent = text;

  document.body.append(message);
};

feedbackPromise();
