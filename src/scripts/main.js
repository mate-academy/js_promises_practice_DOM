'use strict';

document.addEventListener('DOMContentLoaded', () => {
  function createMessage(type, message) {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(type);
    div.textContent = message;
    document.body.appendChild(div);
  }

  const deleteMenu = (e) => e.preventDefault();

  document.addEventListener('contextmenu', deleteMenu);

  // Первый промис
  const firstPromise = new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      document.removeEventListener('click', clickLeft);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }, 3000);

    function clickLeft(e) {
      if (e.button === 0) {
        clearTimeout(timeOut);
        resolve('First promise was resolved');
        document.removeEventListener('click', clickLeft);
      }
    }
    document.addEventListener('click', clickLeft);
  });

  firstPromise
    .then((message) => createMessage('success', message))
    .catch((message) => createMessage('error', message));

  // Второй промис
  const secondPromise = new Promise((resolve) => {
    function clickedBoth(e) {
      if (e.button === 0 || e.button === 2 || e.type === 'contextmenu') {
        resolve('Second promise was resolved');
        document.removeEventListener('click', clickedBoth);
        document.removeEventListener('contextmenu', clickedBoth);
      }
    }
    document.addEventListener('click', clickedBoth);
    document.addEventListener('contextmenu', clickedBoth);
  });

  secondPromise
    .then((message) => createMessage('success', message))
    .catch((message) => createMessage('error', message));

  // Третий промис
  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    function clickedTwoTimes(e) {
      if (e.type === 'click' && e.button === 0) {
        leftClicked = true;
      }

      if ((e.type === 'click' && e.button === 2) || e.type === 'contextmenu') {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', clickedTwoTimes);
        document.removeEventListener('contextmenu', clickedTwoTimes);
      }
    }

    document.addEventListener('click', clickedTwoTimes);
    document.addEventListener('contextmenu', clickedTwoTimes);
  });

  thirdPromise
    .then((message) => createMessage('success', message))
    .catch((message) => createMessage('error', message));
});
