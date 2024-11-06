
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
        this.img = document.createElement('img');
        this.img.src = "https://via.placeholder.com/30";
        this.img.alt = "App Icon";

        // App name
        this.appName = document.createElement('div');
        this.appName.classList.add('app-name');
        this.appName.textContent = 'APP NAME';

        // Append icon and app name to appInfo
        appInfo.appendChild(this.img);
        appInfo.appendChild(this.appName);

        // Container for title and time below app name and icon
        const titleTimeContainer = document.createElement('div');
        titleTimeContainer.classList.add('title-time-container');

        // Title on the left
        this.title = document.createElement('div');
        this.title.classList.add('title');
        this.title.textContent = 'Default Title';

        // Time on the right
        this.time = document.createElement('div');
        this.time.classList.add('time');
        this.time.textContent = 'Now';

        // Append title and time to the title-time container
        titleTimeContainer.appendChild(this.title);
        titleTimeContainer.appendChild(this.time);

        // Append app info and title-time container to header
        header.appendChild(appInfo);
        header.appendChild(titleTimeContainer);

        container.appendChild(header);

        // Notification text content
        this.textContentElement = document.createElement('div');
        this.textContentElement.classList.add('text');
        this.textContentElement.textContent = 'Default notification content';

        container.appendChild(this.textContentElement);
        shadow.appendChild(container);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .container {
                position: fixed;
                top: 35px;
                right: 25px;
                width: 90%;
                max-width: 320px;
                padding: 15px;
                background-color: #1e1e1e;
                border-radius: 15px;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
                color: #f5f5f5;
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.3s ease, transform 0.2s ease, box-shadow 0.15s ease;
                display: flex;
                flex-direction: column;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }

            .container:hover {
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.35);
            }

            .header {
                display: flex;
                flex-direction: column;
                align-items: start;
                margin-bottom: 5px;
            }

            .app-info {
                display: flex;
                align-items: center;
            }

            .app-info img {
                width: 30px;
                height: 30px;
                border-radius: 8px;
                margin-right: 8px;
            }

            .app-name {
                font-size: 14px;
                font-weight: bold;
                color: #ffffff;
            }

            .title-time-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 3px;
            }

            .title {
                font-size: 12px;
                color: #c5c5c5;
                text-align: left;
            }

            .time {
                font-size: 11px;
                color: #8e8e93;
                text-align: right;
            }

            .text {
                font-size: 14px;
                color: #c5c5c5;
                margin-top: 8px;
                line-height: 1.5;
            }

            .close-button-dot {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background-color: #ff5f57;
                position: absolute;
                -webkit-tap-highlight-color: transparent;
                top: 15px;
                right: 17px;
                cursor: pointer;
            }

            .show {
                opacity: 1;
                transform: translateY(0);
            }

            .slide-out {
                transform: translateX(100%);
                opacity: 0;
            }
        `;
        shadow.appendChild(style);
    }

    connectedCallback() {
        // Update attributes once connected to the DOM
        this.img.src = this.getAttribute('icon') || "https://via.placeholder.com/30";
        this.appName.textContent = this.getAttribute('app-name') || 'APP NAME';
        this.title.textContent = this.getAttribute('title') || 'Default Title';
        this.time.textContent = this.getAttribute('time') || 'Now';
        this.textContentElement.textContent = this.innerHTML || 'Default notification content';

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
