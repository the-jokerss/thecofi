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
 
`\n:comet: **=**\`mute-sistem\`
Chat ve Seste mute için güzel sistem

:comet: **=**  \`jail-sistem\`
Etiketlediğiniz Üyeyi karantina altına al

:comet: **=**  \`ban-sistem\`
Etiketlediğiniz üyeyi sunucunuzdan yasaklarsınız

:comet: **=**  \`toplu-rol-sistem\`
Toplu rol ile hem alıp hem de verebileceğiniz sistem

:comet: **=**  \`sayaç-sistem\`**
**Giriş Çıkış**, **Sayaç** hem de **otomatik rol** aynı anda çalıştır

:comet: **=**  \`kısıtlamalar\`**
**Selam, küfür, reklam, büyük harf,** içerikler vardır
**`)
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
 aliases: ['yardım2'],
 permLevel: 0,
};

exports.help = {
 name: 'yardım2',
 description: '',
 usage: ''
};
