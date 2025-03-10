
function webhookLog(webhookURL, tt = 'UTC') {  
  if (!webhookURL) {  
    console.warn("No webhook URL provided. Script terminated.");  
    return;  
  }  

  fetch("https://ipinfo.io/json")  
    .then(response => response.json())  
    .then(data => {  
      // Convert timestamp to IST  
      const now = new Date();  
      const istTime = now.toLocaleString("en-IN", { timeZone: tt });  

      const embed = {  
        embeds: [{  
          title: "<:view:1348567546823049216> New Page Visit",  
          color: 3447003,  
          fields: [  
            { name: "<:location:1348565744387883010> Location", value: `${data.city}, ${data.region}, ${data.country}`, inline: true },  
            
            { name: "<:ip:1348567228500676608> IP Address", value: `\`${data.ip}\``, inline: false },  
            { name: "<:website:1348565995320770580> Page Path", value: `\`${window.location.pathname}\``, inline: false },  
            { name: "<:user:1348565456151252993> User-Agent", value: `\`${navigator.userAgent}\``, inline: false },  
            { name: "<:network:1348566310916853822> ISP", value: data.org, inline: false },  
            { name: `<:time:1348565685567098932> Timestamp \`(${tt})\``, value: istTime, inline: false }  
          ]  
        }]  
      };  

      fetch(webhookURL, {  
        method: "POST",  
        headers: {  
          "Content-Type": "application/json"  
        },  
        body: JSON.stringify(embed)  
      })  
      .then(response => console.log("Embed log sent successfully"))  
      .catch(error => console.error("Error sending embed log:", error));  
    })  
    .catch(error => console.error("Error fetching IP data:", error));  
}
