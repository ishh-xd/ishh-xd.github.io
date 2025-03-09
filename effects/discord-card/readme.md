# Discord Profile Card
### Features 
- Updates automatically.
- Fetches latest data every 15 seconds.
- Partially customisable.
- Shows active status.

## ⚠️ Important 
This function uses **lanyard.rest** api for *fetching discord user*. For this function to work you must join the official [Lanyard](https://discord.gg/lanyard) discord server. 

<br>

**Live Preview**: https://ishh.is-a.dev/effects/discord-card/example

```xml
<div id="card"></div> 

<script src="https://ishh.is-a.dev/effects/discord-card/card.js" defer></script>
<script>
   window.addEventListener('load', () => {
     createDiscordCard({
        userId: 'DISCORD_USER', 
        containerId: 'card', // The div id in html
        width: '90%',
        height: '50px',
        borderRadius: '20px',
        background: 'rgba(0, 0, 0, 0.1)',
        textColor: 'black',
        badgeSize: '24px',
        hoverBackground: 'rgba(0, 0, 0, 0.3)'
    });
   });
</script>
```
