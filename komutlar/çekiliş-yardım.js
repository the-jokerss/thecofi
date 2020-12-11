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
  .setDescription(`**Çekiliş Komutları: 🎉 \n Ana Menü: 💡**`)
  .setImage("https://cdn.discordapp.com/attachments/726744679454081125/775408494765146142/male-hand-holding-megaphone-with-giveaway-speech-bubble-loudspeaker-vector-id1197835447.png")
.setFooter(`Kobs ∞ Code Çekiliş Sistemi`)
 var menü = await message.channel.send(yardım)
 const collector = menü.createReactionCollector(filter, { time: 99999 });
  let emojiler = ["🎉","💡"]
  await menü.react(emojiler[0])
  await menü.react(emojiler[1])

collector.on('collect', (reaction, user) => {


  if(reaction.emoji.name == "🎉") {
    const kobscode = new Discord.MessageEmbed()
      .setColor("PURPLE")
 .addField("**Çekiliş Komutları**", `\n**!**__çekiliş__ [süre] [kazanansayısı] [ödül] = **__Çekiliş Yaparsınız__** \n**!**__reroll__ = **__Çekilişde Yeni Kişi Seçersiniz.__** \n**!**__çekilişdurdur__ = **__Çekilişi Durdurursunuz.__** \n**!**__çekilişibitir__ = **__Çekilişi Bitirirsiniz.__**`)
  .setImage("https://cdn.discordapp.com/attachments/726744679454081125/775408608778780712/giveaway-banner-post-template-win-a-prize-giveaway-social-media-vector-id1211480853.png")
  .setThumbnail(client.user.avatarURL())
 .setFooter(`Cofilia ∞ Code Çekiliş Sistemi`)
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
 aliases: ['çekiliş-yardım'],
 permLevel: 0,
};

exports.help = {
 name: 'çekiliş-yardım',
 description: '',
 usage: ''
};