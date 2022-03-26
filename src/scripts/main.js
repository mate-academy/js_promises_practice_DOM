'use strict';

const resolver1 = (resolve, reject) => {
  document.addEventListener('click', () => {
    return resolve('First promise was resolved');
  });

  setTimeout(() => {
    return reject('First promise was rejected');
  }, 3000);
};

const resolver2 = (resolve) => {
  // we could use mouseup event instead of click here 
  // and add only one addEventListener
  // but it would appear before promise1 in such case

  document.addEventListener('click', () => {
    return resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (e.button === 2) {
      return resolve('Second promise was resolved');
    };
  });
};

const resolver3 = (resolve) => {
  let countLeft = 0;
  let countRight = 0;

  document.addEventListener('click', () => {
    countLeft++;

    if (countLeft > 0 && countRight > 0) {
      return resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (e.button === 2) {
      countRight++;
    } else {
      return;
    }

    if (countLeft > 0 && countRight > 0) {
      return resolve('Third promise was resolved');
    }
  });
};

function makeDom(eventType, textContent) {
  const notification = document.createElement('div');
  notification.setAttribute('data-qa', 'notification');
  const pageBody = document.querySelector('body');

  switch (eventType) {
    case 'success':
      notification.classList.add('success');
      notification.innerHTML = textContent;
      break;

    case 'error':
      notification.classList.add('error');
      notification.innerHTML = textContent;
      break;
  }

  pageBody.append(notification);
}

const promise1 = new Promise(resolver1);
const promise2 = new Promise(resolver2);
const promise3 = new Promise(resolver3);

// catches were added to all promises for more common usage
// in this task only it is needed only once

promise1.then(result => {
  makeDom('success', result);
}).catch(result => {
  makeDom('error', result);
});

promise2.then(result => {
  makeDom('success', result);
}).catch(result => {
  makeDom('error', result);
});

promise3.then(result => {
  makeDom('success', result);
}).catch(result => {
  makeDom('error', result);
});
