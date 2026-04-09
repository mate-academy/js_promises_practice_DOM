'use strict';

const bodyContainer = document.querySelector('body');

// --- the func. notifications
function generatePromiseMessage(keyStatus, item) {
  const messageMap = {
    success: {
      first_success: 'First promise was resolved',
      second_success: 'Second promise was resolved',
      third_success: 'Third promise was resolved',
    },
    error: {
      first_error: 'First promise was rejected',
    },
  };

  const messageHtml = `
   <div class="${keyStatus}" data-qa="notification">
     ${messageMap[keyStatus][item]}
   </div>
 `;

  return messageHtml;
}

bodyContainer.addEventListener('contextmenu', (e) => e.preventDefault());

// func. firstRun
function firstRun() {
  // firstPromise
  const firstPromise = new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      const result = {
        statusKey: 'error',
        itemKey: 'first_error',
      };

      reject(result);
    }, 3000);

    bodyContainer.addEventListener(
      'mousedown',
      (e) => {
        const result = {
          statusKey: 'success',
          itemKey: 'first_success',
        };

        if (e.button === 0) {
          clearTimeout(timerId);
          resolve(result);
        }
      },
      {
        once: true,
      },
    );
  });

  return firstPromise;
}

// func. secondRun
function secondRun() {
  // secondPromise
  const secondPromise = new Promise((resolve) => {
    bodyContainer.addEventListener(
      'mousedown',
      (e) => {
        const pushBtn = e.button;
        const result = {
          statusKey: 'success',
          itemKey: 'second_success',
        };

        if (pushBtn === 0 || pushBtn === 2) {
          e.preventDefault();
          resolve(result);
        }
      },
      {
        once: true,
      },
    );
  });

  return secondPromise;
}

// func. thirdRun
function thirdRun() {
  // thirdPromise
  const thirdPromise = new Promise((resolve) => {
    const memmory = {
      leftBtn: null,
      rightBtn: null,
    };

    bodyContainer.addEventListener('mousedown', (e) => {
      const pushBtn = e.button;
      const result = {
        statusKey: 'success',
        itemKey: 'third_success',
      };

      if (pushBtn === 0) {
        memmory.leftBtn = pushBtn;
      } else if (pushBtn === 2) {
        memmory.rightBtn = pushBtn;
      }

      const { leftBtn, rightBtn } = memmory;

      if (leftBtn !== null && rightBtn !== null) {
        if (leftBtn !== rightBtn) {
          resolve(result);
        }
      }
    });
  });

  return thirdPromise;
}

firstRun()
  .then(({ statusKey, itemKey }) => {
    const renderedMessage = generatePromiseMessage(statusKey, itemKey);

    bodyContainer.insertAdjacentHTML('afterbegin', renderedMessage);
  })
  .catch(({ statusKey, itemKey }) => {
    const renderedMessage = generatePromiseMessage(statusKey, itemKey);

    bodyContainer.insertAdjacentHTML('afterbegin', renderedMessage);
  });

secondRun().then(({ statusKey, itemKey }) => {
  const renderedMessage = generatePromiseMessage(statusKey, itemKey);

  bodyContainer.insertAdjacentHTML('afterbegin', renderedMessage);
});

thirdRun().then((result) => {
  const renderedMessage = generatePromiseMessage(
    result.statusKey,
    result.itemKey,
  );

  bodyContainer.insertAdjacentHTML('afterbegin', renderedMessage);
});
