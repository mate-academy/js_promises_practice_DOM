'use strict';

const bodyElement = document.body;

function displayNotification(message, isSuccess) {
  const notificationDiv = document.createElement('div');
  notificationDiv.setAttribute('data-qa', 'notification');
  notificationDiv.classList.add(isSuccess ? 'success' : 'error');
  notificationDiv.textContent = message;

  bodyElement.appendChild(notificationDiv);

  setTimeout(() => {
      notificationDiv.remove();
  }, 3000);
}

const firstPromise = new Promise((resolve, reject) => {
    // Створюємо Проміс, який буде resolved при лівому кліку в документі
    const clickPromise = new Promise((res) => {
        const handleClick = (event) => {
            if (event.button === 0) { // Перевіряємо, чи це лівий клік (button 0)
                res('First promise was resolved'); // Вирішуємо Проміс успіхом
                document.removeEventListener('click', handleClick); // Видаляємо слухача, щоб він не спрацьовував повторно
            }
        };
        document.addEventListener('click', handleClick); // Додаємо слухача кліків на весь документ
    });
  
  const timeoutPromise = new Promise((_, rej) => {
        setTimeout(() => {
            rej(new Error('First promise was rejected'));
        }, 3000);
  });
  
   Promise.race([clickPromise, timeoutPromise])
        .then((result) => {
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
});

firstPromise
    .then((message) => {
        displayNotification(message, true);
    })
    .catch((error) => {
        displayNotification(`${error.message}`, false);
    });

    const secondPromise = new Promise((resolve) => {
    const handleClick = (event) => {
        if (event.button === 0 || event.button === 2) {
            resolve('Second promise was resolved');
            document.removeEventListener('click', handleClick);
        }
    };
    document.addEventListener('click', handleClick);
});

secondPromise
    .then((message) => {
        displayNotification(message, true);
    });

    const leftClickPromise = new Promise((resolve) => {
    const handleLeftClick = (event) => {
        if (event.button === 0) {
            resolve('Лівий клік');
            document.removeEventListener('click', handleLeftClick);
        }
    };
    document.addEventListener('click', handleLeftClick);
    });

const rightClickPromise = new Promise((resolve) => {
  const handleRightClickContextMenu = (event) => {

    resolve('Правий клік');
    document.removeEventListener('contextmenu', handleRightClickContextMenu);
  };

  const handleCtrlLeftClick = (event) => {
    if (event.button === 0 && event.ctrlKey) {
      resolve('Правий клік (Ctrl+лівий клік)');
      document.removeEventListener('click', handleCtrlLeftClick);
    }
  };

  document.addEventListener('contextmenu', handleRightClickContextMenu);
  document.addEventListener('click', handleCtrlLeftClick);
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise])
  .then(() => {
    return 'Third promise was resolved';
  });

thirdPromise
    .then((message) => {
        displayNotification(message, true);
    })
    .catch((error) => {
        displayNotification(`Error with third promise: ${error.message}`, false);
    });
