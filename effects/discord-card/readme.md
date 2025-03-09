### Discord Profile Card
(Fully customisable)

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
