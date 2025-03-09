
function createDiscordCard({
    userId, 
    containerId, 
    width = '90%', 
    height = '60px', 
    borderRadius = '15px', 
    background = 'black', 
    textColor = 'white', 
    badgeSize = '20px',
    hoverBackground = 'gray'
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = `
        <style>
            #user-bar {
                background: ${background};
                border-radius: ${borderRadius};
                padding: 15px 25px;
                width: ${width};
                height: ${height};
                backdrop-filter: blur(20px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 15px;
                color: ${textColor};
                font-family: Arial, sans-serif;
                transition: background 0.3s;
                overflow: hidden;
                cursor: pointer;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
            }

            #user-bar:hover {
                background: ${hoverBackground};
            }

            #avatar-container {
                position: relative;
            }

            #avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 3px solid rgba(255, 255, 255, 0.1);
            }

            #status {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 3px solid #000;
                position: absolute;
                bottom: 3px;
                right: 3px;
            }

            #username {
                font-size: 18px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            #badges {
                display: flex;
                gap: 5px;
                overflow-x: auto;
                max-width: 200px;
            }

            #badges img {
                width: ${badgeSize};
                height: ${badgeSize};
                flex-shrink: 0;
            }

            .online { background-color: #43b581; }
            .idle { background-color: #faa61a; }
            .dnd { background-color: #f04747; }
            .offline { background-color: #747f8d; }

            #badges::-webkit-scrollbar {
                height: 5px;
            }
            #badges::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            #badges::-webkit-scrollbar-track {
                background: transparent;
            }
        </style>

        <div id="user-bar" onclick="window.open('https://discord.com/users/${userId}', '_blank')">
            <div id="avatar-container">
                <img id="avatar" src="" alt="Avatar">
                <div id="status"></div>
            </div>
            <div id="user-info">
                <div id="username">
                    <span id="name"></span>
                    <div id="badges"></div>
                </div>
            </div>
        </div>
    `;

    async function fetchUserDetails() {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
            const data = await response.json();

            if (data.success) {
                const user = data.data.discord_user;
                const presence = data.data.discord_status;
                const badges = user.public_flags;

                container.querySelector('#avatar').src = 
                    `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
                container.querySelector('#name').textContent = user.username;
                container.querySelector('#status').className = presence;
                
                // Clear previous badges
                const badgesContainer = container.querySelector('#badges');
                badgesContainer.innerHTML = '';

                // Your custom badge icons
                const badgeIcons = {
                    1: 'https://cdn.discordapp.com/emojis/1348298013982064712.png',
                    2: 'https://cdn.discordapp.com/emojis/1348298094810234920.png',
                    4: 'https://cdn.discordapp.com/emojis/1348298617622106194.gif',
                    8: 'https://cdn.discordapp.com/emojis/1348298901874278435.png',
                    64: 'https://cdn.discordapp.com/emojis/1348310282770055209.png',
                    128: 'https://cdn.discordapp.com/emojis/1348310338457571369.png',
                    256: 'https://cdn.discordapp.com/emojis/1348310441012756541.png',
                    512: 'https://cdn.discordapp.com/emojis/1348298794441113702.png',
                    16384: 'https://cdn.discordapp.com/emojis/1348298901874278435.png',
                    131072: 'https://cdn.discordapp.com/emojis/1348298985428750417.png',
                    4194304: 'https://cdn.discordapp.com/emojis/1348299058367823902.png'
                };

                // Render badges
                for (const [flag, icon] of Object.entries(badgeIcons)) {
                    if (badges & flag) {
                        const img = document.createElement('img');
                        img.src = icon;
                        badgesContainer.appendChild(img);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    setInterval(fetchUserDetails, 15000);
    fetchUserDetails();
}
