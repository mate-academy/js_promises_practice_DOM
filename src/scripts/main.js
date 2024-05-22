document.addEventListener('DOMContentLoaded', () => {
  const notification = document.querySelector('[data-qa="notification"]');

  // Function to show notification with success or error message
  function showNotification(message, isSuccess) {
    notification.textContent = message;
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
  }

  // First Promise
  const firstPromise = new Promise((resolve, reject) => {
    const clickHandler = () => {
      document.removeEventListener('click', clickHandler);
      resolve('First promise was resolved on a left click in the document');
    };

    document.addEventListener('click', clickHandler);

    setTimeout(() => {
      document.removeEventListener('click', clickHandler);

      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }, 3000);
  });

  firstPromise
    .then((message) => showNotification(message, true))
    .catch((error) => showNotification(error.message, false));

  // Second Promise
  const secondPromise = new Promise((resolve) => {
    const clickHandler = (clickEvent) => {
      if (clickEvent.button === 0 || clickEvent.button === 2) {
        resolve('Second promise was resolved');
      }
    };

    document.addEventListener('click', clickHandler);
  });

  secondPromise.then((message) => showNotification(message, true));

  // Third Promise
  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    function checkBothClicks() {
      if (leftClicked && rightClicked) {
        resolve(
          'Third promise was resolved only after both ' +
            'left and right clicks happened',
        );
      }
    }

    const leftClickHandler = () => {
      leftClicked = true;
      checkBothClicks();
    };

    const rightClickHandler = () => {
      rightClicked = true;
      checkBothClicks();
    };

    document.addEventListener('click', leftClickHandler);
    document.addEventListener('contextmenu', rightClickHandler);
  });

  thirdPromise.then((message) => showNotification(message, true));
});
