/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-shadow */
document.addEventListener('DOMContentLoaded', function () {
  let leftClickOccurred = false;
  let rightClickOccurred = false;

  const firstPromise = new Promise((resolve, reject) => {
    const leftClickHandler = () => {
      resolve('First promise was resolved on a left click in the document');
      document.removeEventListener('click', leftClickHandler);
      clearTimeout(timeoutId);
    };

    document.addEventListener('click', leftClickHandler);

    const timeoutId = setTimeout(() => {
      reject('First promise was rejected in 3 seconds if not clicked');
      document.removeEventListener('click', leftClickHandler);
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    const clickHandler = () => {
      resolve('Second promise was resolved');
      document.removeEventListener('click', clickHandler);
    };

    document.addEventListener('click', clickHandler);
    document.addEventListener('contextmenu', clickHandler);
  });

  const thirdPromise = new Promise((resolve) => {
    const leftClickHandler = () => {
      leftClickOccurred = true;
      checkBothClicks();
    };

    const rightClickHandler = (event) => {
      event.preventDefault();
      rightClickOccurred = true;
      checkBothClicks();
    };

    document.addEventListener('click', leftClickHandler);
    document.addEventListener('contextmenu', rightClickHandler);

    function checkBothClicks() {
      if (leftClickOccurred && rightClickOccurred) {
        resolve(
          // eslint-disable-next-line max-len
          'Third promise was resolved only after both left and right clicks happened',
        );
        document.removeEventListener('click', leftClickHandler);
        document.removeEventListener('contextmenu', rightClickHandler);
      }
    }
  });

  function showNotification(message, isSuccess) {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = isSuccess ? 'success' : 'error';
    notification.textContent = message;
    document.body.appendChild(notification);
  }

  firstPromise
    .then((message) => {
      showNotification(message, true);
    })
    .catch((error) => {
      showNotification(error, false);
    });

  secondPromise.then((message) => {
    showNotification(message, true);
  });

  thirdPromise.then((message) => {
    showNotification(message, true);
  });
});
