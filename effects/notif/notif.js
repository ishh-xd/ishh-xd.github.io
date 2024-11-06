class CustomNotif extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the container
        const container = document.createElement('div');
        container.classList.add('container');

        // Close button (red dot) in the top-right corner
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button-dot', 'red');
        closeButton.onclick = () => this.hideNotification();
        container.appendChild(closeButton);

        // Create the header
        const header = document.createElement('div');
        header.classList.add('header');

        // App icon and app name container
        const appInfo = document.createElement('div');
        appInfo.classList.add('app-info');

        // App icon
        const img = document.createElement('img');
        img.src = this.getAttribute('icon') || "https://via.placeholder.com/30";
        img.alt = "App Icon";

        // App name
        const appName = document.createElement('div');
        appName.classList.add('app-name');
        appName.textContent = this.getAttribute('app-name') || 'APP NAME';

        // Append icon and app name to appInfo
        appInfo.appendChild(img);
        appInfo.appendChild(appName);

        // Container for title and time below app name and icon
        const titleTimeContainer = document.createElement('div');
        titleTimeContainer.classList.add('title-time-container');

        // Title on the left
        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = this.getAttribute('title') || 'Default Title';

        // Time on the right
        const time = document.createElement('div');
        time.classList.add('time');
        time.textContent = this.getAttribute('time') || 'Now';

        // Append title and time to the title-time container
        titleTimeContainer.appendChild(title);
        titleTimeContainer.appendChild(time);

        // Append app info and title-time container to header
        header.appendChild(appInfo);
        header.appendChild(titleTimeContainer);

        container.appendChild(header);

        // Notification text content
        const textContent = document.createElement('div');
        textContent.classList.add('text');
        textContent.textContent = this.innerHTML || 'Default notification content';

        container.appendChild(textContent);
        shadow.appendChild(container);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            /* CSS already provided, not modified */
        `;
        shadow.appendChild(style);
    }

    connectedCallback() {
        setTimeout(() => this.showNotification(), 500);
    }

    showNotification() {
        this.shadowRoot.querySelector('.container').classList.add('show');
    }

    hideNotification() {
        const notification = this.shadowRoot.querySelector('.container');
        notification.classList.add('slide-out');
        setTimeout(() => {
            notification.classList.remove('show', 'slide-out');
            this.remove();
        }, 300);
    }
}

// Define the custom element
customElements.define('custom-notif', CustomNotif);
