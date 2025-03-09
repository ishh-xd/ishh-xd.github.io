# Discord Profile Card
### Fully Customisable

## ⚠️ Important 
This function uses **lanyard.rest** api for *fetching discord user*. For this function to work you must join the [Lanyard discord server](https://discord.gg/lanyard). 

`(If the invite link doesn't work, find it online.)`

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
