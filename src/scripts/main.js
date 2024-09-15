'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;
  const massage = document.createElement('div');

  massage.setAttribute('data-qa', 'notification');

  const handleClick = () => {
    clicked = true;
    resolve(massage);

    document.removeEventListener('click', handleClick);
    firstPromiseHandler(massage);
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!clicked) {
      reject(massage);
      document.removeEventListener('click', handleClick);
      firstPromiseHandler(massage);
    }
  }, 3000);
});

function firstPromiseHandler(massage) {
  firstPromise
    .then((notification) => {
      notification.textContent = 'First promise was resolved';
      notification.classList.add('success');
    })
    .catch((notification) => {
      notification.textContent = 'First promise was rejected';
      notification.classList.add('error');
    })
    .finally(() => {
      document.body.appendChild(massage);
    });
}

const secondPromise = new Promise((resolve) => {
  const massage = document.createElement('div');

  massage.setAttribute('data-qa', 'notification');

  ['click', 'contextmenu'].forEach((oneEvent) => {
    document.addEventListener(oneEvent, () => {
      resolve(massage);
      secondPromiseHandler(massage);
    });
  });
});

function secondPromiseHandler(massage) {
  secondPromise
    .then((notification) => {
      notification.textContent = 'Second promise was resolved';
      notification.classList.add('success');
    })
    .finally(() => {
      document.body.appendChild(massage);
    });
}

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;
  const massage = document.createElement('div');

  massage.setAttribute('data-qa', 'notification');

  ['click', 'contextmenu'].forEach((oneEvent) => {
    document.addEventListener(oneEvent, (e) => {
      if (e.type === 'click') {
        leftClicked = true;
      }

      if (e.type === 'contextmenu') {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve(massage);
        thirdPromiseHandler(massage);
      }
    });
  });
});

function thirdPromiseHandler(massage) {
  thirdPromise
    .then((notification) => {
      notification.textContent = 'Third promise was resolved';
      notification.classList.add('success');
    })
    .finally(() => {
      document.body.appendChild(massage);
    });
}
