const notificationDiv = document.querySelector('[data-qa="notification"]');

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);

  document.addEventListener('click', function onClick(e) {
    if (e.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved on a left click in the document');
    }
  });
});

firstPromise
  .then((message) => {
    notificationDiv.classList.add('success');
    notificationDiv.textContent = message;
  })
  .catch((message) => {
    notificationDiv.classList.add('error');
    notificationDiv.textContent = message;
  });

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});

secondPromise
  .then((message) => {
    notificationDiv.classList.add('success');
    notificationDiv.textContent = message;
  })
  .catch((message) => {
    notificationDiv.classList.add('error');
    notificationDiv.textContent = message;
  });

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve(
        'Third promise was resolved only after both left' +
          'and right clicks happened',
      );
    }
  });
});

thirdPromise
  .then((message) => {
    notificationDiv.classList.add('success');
    notificationDiv.textContent = message;
  })
  .catch((message) => {
    notificationDiv.classList.add('error');
    notificationDiv.textContent = message;
  });
