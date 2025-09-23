'use strict';

// Utility to display messages
    function notify(message, isError = false) {
      const div = document.createElement("div");
      div.dataset.qa = "notification";
      div.className = isError ? "error" : "success";
      div.textContent = message;
      document.body.appendChild(div);
    }

    // ========== Promise 1 ==========
    const firstPromise = new Promise((resolve, reject) => {
      let resolved = false;

      function onClick(event) {
        if (event.button === 0) { // Left click
          resolved = true;
          resolve("First promise was resolved on a left click in the document");
          document.removeEventListener("click", onClick);
        }
      }

      document.addEventListener("click", onClick);

      setTimeout(() => {
        if (!resolved) {
          reject("First promise was rejected in 3 seconds if not clicked");
          document.removeEventListener("click", onClick);
        }
      }, 3000);
    });

    // ========== Promise 2 ==========
    const secondPromise = new Promise((resolve) => {
      function onClick(event) {
        if (event.button === 0 || event.button === 2) { // Left or right click
          resolve("Second promise was resolved");
          document.removeEventListener("click", onClick);
          document.removeEventListener("contextmenu", onClick);
        }
      }
      document.addEventListener("click", onClick);
      document.addEventListener("contextmenu", onClick);
    });

    // ========== Promise 3 ==========
    const thirdPromise = new Promise((resolve) => {
      let leftClicked = false;
      let rightClicked = false;

      function onClick(event) {
        if (event.button === 0) leftClicked = true;
        if (event.button === 2) rightClicked = true;

        if (leftClicked && rightClicked) {
          resolve("Third promise was resolved only after both left and right clicks happened");
          document.removeEventListener("click", onClick);
          document.removeEventListener("contextmenu", onClick);
        }
      }

      document.addEventListener("click", onClick);
      document.addEventListener("contextmenu", onClick);
    });

    // Handlers
    function onSuccess(message) {
      notify(message, false);
    }

    function onError(message) {
      notify(message, true);
    }

    // Attach handlers
    firstPromise.then(onSuccess).catch(onError);
    secondPromise.then(onSuccess).catch(onError);
    thirdPromise.then(onSuccess).catch(onError);