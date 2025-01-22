'use strict';

const firstPromiseResolve = Promise.resolve('First promise was resolved');
const secondPromise = Promise.resolve('Second promise was resolved');
const thirdPromise = Promise.resolve('Third promise was resolved');

function showNotification(data, classStatus) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(classStatus);
  div.textContent = data;
  document.body.appendChild(div);
}

let leftClickState = false;
let rightClickState = false;
let isRejectedFirstPromise = false;

setTimeout(() => {
  if (!leftClickState) {
    const firstPromiseReject = Promise.reject(
      new Error('First promise was rejected'),
    );

    firstPromiseReject
      .catch((err) => showNotification(err.message, 'error'))
      .finally(() => (isRejectedFirstPromise = true));
  }
}, 3000);

document.addEventListener('mouseup', async (e) => {
  if (e.button === 0) {
    leftClickState = true;
  }

  if (e.button === 2) {
    rightClickState = true;
  }

  if (leftClickState && !isRejectedFirstPromise) {
    const data = await firstPromiseResolve;

    showNotification(data, 'success');
  }

  if (leftClickState && rightClickState) {
    const data = await thirdPromise;

    showNotification(data, 'success');
    leftClickState = false;
    rightClickState = false;
  }

  if (leftClickState || rightClickState) {
    const data = await secondPromise;

    showNotification(data, 'success');
  }
});
