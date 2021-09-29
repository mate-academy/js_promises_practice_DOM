'use strict';

function createNotification(messageString, classString) {
  const message = document.createElement('div');

  message.classList.add(classString);
  message.dataset.qa = 'notification';

  message.innerText = messageString;

  return message;
}

function firstPromise() {
  const resolve = (resolved, rejected) => {
    document.addEventListener('click', () => {
      resolved('First promise was resolved');
    });

    setTimeout(() => {
      rejected('First promise was rejected');
    }, 3000);
  };

  return new Promise(resolve);
}

function secondPromise() {
  const resolve = (resolved) => {
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolved('Second promise was resolved');
      }
    });
  };

  return new Promise(resolve);
}

function thirdPromise(num) {
  const resolve = (resolved) => {
    document.addEventListener('mouseup', (e) => {
      if (e.button === num) {
        resolved('Third promise was resolved');
      }
    });
  };

  return new Promise(resolve);
}

thirdPromise(0)
  .then(() => thirdPromise(2))
  .then(result => {
    document.body.append(createNotification(result, 'success'));
  });

// Почему такая реализация не работает?

// function clicked(num, part) {
//   const resolve = (resolved) => {
//     document.addEventListener('mouseup', (e) => {
//       if (e.button === num) {
//         resolved(part);
//       }
//     });
//   };

//   return new Promise(resolve);
// }

// async function thirdPromise() {
//   const result1 = await clicked(0, 'Third promise ');
//   const result2 = await clicked(2, 'was resolved');

//   return result1 + result2;
// }

// thirdPromise()
//   .then(result => {
//     document.body.append(createNotification(result, 'success'));
//   });

firstPromise()
  .then(result => {
    document.body.append(createNotification(result, 'success'));
  })
  .catch(error => {
    document.body.append(createNotification(error, 'warning'));
  });

secondPromise()
  .then(result => {
    document.body.append(createNotification(result, 'success'));
  });
