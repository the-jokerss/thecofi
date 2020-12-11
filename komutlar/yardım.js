const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => {
   const filter = (reaction, user) => {
  return ["🎉","💡"].includes(reaction.emoji.name) && user.id === message.author.id && reaction.users.remove(message.author.id);
};

  const yardım = new Discord.MessageEmbed()
    .setTitle(`${message.author.username} - Tarafından İstendi`)
      .setColor("PURPLE")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`**Yardım Komutları: 🎉 \n Ana Menü: 💡**`)
  .setImage("https://cdn.discordapp.com/attachments/785585894232031263/785924985381978142/unknown.png")
.setFooter(`TheCofi Yardım`)
 var menü = await message.channel.send(yardım)
 const collector = menü.createReactionCollector(filter, { time: 99999 });
  let emojiler = ["🎉","💡"]
  await menü.react(emojiler[0])
  await menü.react(emojiler[1])

collector.on('collect', (reaction, user) => {


  if(reaction.emoji.name == "🎉") {
    const kobscode = new Discord.MessageEmbed()
      .setColor("PURPLE")
 .addField("**TheCofi Yardım Komutları**",
 
`\n**\`c!kayıt-yardım\`**
> **Kayıt, Kutulu \`&\` Kutusuz, Diğer, Tag rol,**
> **Koruma, Say, Aktiflik, Mesaj tag**

 **\`c!seviye-sistem\`**
> **Basit Seviye, Seviye sıralaması & büyük **
> **depolama alan** 

\`c!yardım2\` Menüsün de neler var?

> **Mute, Karantina, Ban, Toplu rol, Sayaç \`&\` Oto**
> **rol, Kısıtlamalar**

 \`c!yardım3\` Menüsün de Bunlar Var 

> **Yasak tag, Oto isim, Komut mesaj, Fake hesap,** 
> **Sunucu tema, Kanal arındır \`&\` Rol arındır**`)

  .setImage("https://cdn.discordapp.com/attachments/785585894232031263/785924985381978142/unknown.png")
  .setThumbnail(client.user.avatarURL())
 .setFooter(`TheCofi Yardım`)
menü.edit(kobscode)
  }

 if(reaction.emoji.name == "💡") {
 menü.edit(yardım)
  }
});

collector.on('end', collected => {
  console.log(`Collected ${collected.size} items`);
});

};

exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ['yardım'],
 permLevel: 0,
};

exports.help = {
 name: 'yardım',
 description: '',
 usage: ''
};