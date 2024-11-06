class CustomNotif extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the container
        this.container = document.createElement('div');
        this.container.classList.add('container');

        // Close button (red dot) in the top-right corner
        this.closeButton = document.createElement('span');
        this.closeButton.classList.add('close-button-dot', 'red');
        this.closeButton.onclick = () => this.hideNotification();
        this.container.appendChild(this.closeButton);

        // Create the header
        this.header = document.createElement('div');
        this.header.classList.add('header');

        // App icon and app name container
        this.appInfo = document.createElement('div');
        this.appInfo.classList.add('app-info');

        // App icon
        this.img = document.createElement('img');

        // App name
        this.appName = document.createElement('div');
        this.appName.classList.add('app-name');

        // Append icon and app name to appInfo
        this.appInfo.appendChild(this.img);
        this.appInfo.appendChild(this.appName);

        // Container for title and time below app name and icon
        this.titleTimeContainer = document.createElement('div');
        this.titleTimeContainer.classList.add('title-time-container');

        // Title on the left
        this.title = document.createElement('div');
        this.title.classList.add('title');

        // Time on the right
        this.time = document.createElement('div');
        this.time.classList.add('time');

        // Append title and time to the title-time container
        this.titleTimeContainer.appendChild(this.title);
        this.titleTimeContainer.appendChild(this.time);

        // Append app info and title-time container to header
        this.header.appendChild(this.appInfo);
        this.header.appendChild(this.titleTimeContainer);

        this.container.appendChild(this.header);

        // Notification text content
        this.textContentDiv = document.createElement('div');
        this.textContentDiv.classList.add('text');

        this.container.appendChild(this.textContentDiv);
        shadow.appendChild(this.container);

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
        // Set the attributes after the element is connected to the DOM
        this.img.src = this.getAttribute('icon') || "https://via.placeholder.com/30";
        this.img.alt = "App Icon";

        this.appName.textContent = this.getAttribute('app-name') || 'App Name';
        this.title.textContent = this.getAttribute('title') || 'Notification Title';
        this.time.textContent = this.getAttribute('time') || '3 hours ago';

        // Set inner text content or fallback to default text
        this.textContentDiv.textContent = this.getAttribute('content') || 'This is the default notification content.';

        // Show notification with a delay
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
