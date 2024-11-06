
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
            title.textContent = this.getAttribute('title');

            // Time on the right
            const time = document.createElement('div');
            time.classList.add('time');
            time.textContent = this.getAttribute('time');

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
            textContent.textContent = this.innerHTML;

            container.appendChild(textContent);
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
