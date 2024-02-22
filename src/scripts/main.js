/* eslint-disable brace-style */
'use strict';

const notificationDiv = document.querySelector('[data-qa="notification"]');
// Obsługa sukcesu dla wszystkich obietnic.
// Deklaruje funkcję successHandler, która przyjmuje wiadomość jako argument.
const successHandler = (message) =>
{
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = message;
  notificationDiv.appendChild(notification);
};

// Obsługa błędu dla wszystkich obietnic.
// Deklaruje funkcję errorHandler, która przyjmuje wiadomość jako argument.
const errorHandler = (message) =>
{
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('error');
  notification.textContent = message;
  notificationDiv.appendChild(notification);
};

// Obietnica 1: Rozwiązana po kliknięciu lewym przyciskiem myszy,
// odrzucona po 3 sekundach, jeśli nie kliknięto.
// Tworzy obietnicę firstPromise.
const firstPromise = new Promise((resolve, reject) =>
{
  // Deklaruje funkcję handleClick, która zostanie wywołana po kliknięciu.
  const handleClick = () =>
  {
    // Rozwiązuje obietnicę z wiadomością o sukcesie.
    resolve('First promise was resolved');
  };

  // Deklaruje funkcję handleTimeout, która zostanie wywołana po 3 sekundach.
  const handleTimeout = () =>
  { // Odrzuca obietnicę z wiadomością o błędzie.
    reject(new Error('First promise was rejected'));
  };

  // Nasłuchuje zdarzenia kliknięcia myszy.
  document.addEventListener('click', handleClick);
  // Ustawia opóźnienie 3 sekund do odrzucenia obietnicy.
  setTimeout(handleTimeout, 3000);
});

// Obietnica 2: Rozwiązana po kliknięciu lewym lub prawym przyciskiem myszy,
//  nigdy nie odrzucona.
// Tworzy obietnicę secondPromise.
const secondPromise = new Promise((resolve) =>
{
  // Deklaruje funkcję handleContextMenu,
  // która zostanie wywołana po kliknięciu prawym przyciskiem myszy.
  const handleContextMenu = (evt) =>
  { // Zapobiega domyślnemu wyświetlaniu menu kontekstowego.
    evt.preventDefault();
    // Rozwiązuje obietnicę z wiadomością o sukcesie.
    resolve('Second promise was resolved');
  };

  // Nasłuchuje zdarzenia menu kontekstowego myszy.
  document.addEventListener('contextmenu', handleContextMenu);
});

// Obietnica 3: Rozwiązana po kliknięciu obu przycisków myszy (lewy i prawy).
// Tworzy obietnicę thirdPromise.
const thirdPromise = new Promise((resolve) =>
{
  let leftClicked = false;
  let rightClicked = false;

  // Deklaruje funkcję handleClick, która zostanie wywołana po kliknięciu myszy.
  const handleClick = (mouseEvent) =>
  {
    // Sprawdza, czy kliknięcie to zdarzenie kliknięcia myszy.
    if (mouseEvent.type === 'click')
    {
      // Sprawdza, czy kliknięto lewym przyciskiem myszy.
      if (mouseEvent.button === 0 && !leftClicked)
      {
        leftClicked = true;
      }
    }

    // Sprawdza,
    // czy nastąpiło kliknięcie prawym przyciskiem myszy (contextmenu).
    if (mouseEvent.type === 'contextmenu' && !rightClicked)
    { // Zapobiega domyślnemu wyświetlaniu menu kontekstowego.
      mouseEvent.preventDefault();
      rightClicked = true;
    }

    // Sprawdza, czy nastąpiły kliknięcia oboma przyciskami myszy.
    if (leftClicked && rightClicked)
    {
      // Rozwiązuje obietnicę z wiadomością o sukcesie.
      resolve('Third promise was resolved');
    }
  };

  // Nasłuchuje zdarzenia kliknięcia myszy.
  document.addEventListener('click', handleClick);
  // Nasłuchuje zdarzenia menu kontekstowego myszy (prawego przycisku).
  document.addEventListener('contextmenu', handleClick);
});

// Przyłącza handlery do obietnic
// Dodaje handlery sukcesu i błędu do pierwszej obietnicy.
firstPromise.then(successHandler, errorHandler);
// Dodaje handlery sukcesu i błędu do drugiej obietnicy.
secondPromise.then(successHandler, errorHandler);
// Dodaje handlery sukcesu i błędu do trzeciej obietnicy.
thirdPromise.then(successHandler, errorHandler);
