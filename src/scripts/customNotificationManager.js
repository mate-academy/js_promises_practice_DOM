// javascript
export default class CustomNotificationManager {
  /**
   * @param {'success' | 'error' | 'info'} type
   * @param {string | HTMLElement} parentElement
   */
  constructor(type = 'success', parentElement = 'body') {
    this.type = type;

    if (typeof parentElement === 'string') {
      this._container = document.querySelector(parentElement);
    } else if (parentElement instanceof HTMLElement) {
      this._container = parentElement;
    } else {
      throw new Error('Invalid parentElement');
    }

    if (!this._container) {
      throw new Error('Notification container not found');
    }
  }

  /**
   * @return {HTMLElement}
   */
  createNotification(posRight, title, description) {
    const container = this._container;

    if (!container) {
      throw new Error('Notification container is not found');
    }

    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.classList.add(this.type);
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = `${posRight}px`;

    if (title) {
      const titleEl = document.createElement('h4');

      titleEl.textContent = title;
      notification.appendChild(titleEl);
    }

    if (description) {
      const descriptionEl = document.createElement('p');

      descriptionEl.textContent = description;
      notification.appendChild(descriptionEl);
    }

    container.appendChild(notification);

    return notification;
  }
}
