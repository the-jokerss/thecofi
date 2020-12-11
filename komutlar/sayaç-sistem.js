const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {

message.channel.send(new Discord.MessageEmbed().setTitle('CloudUP Giriş & Sayaç Sistem').setDescription(`\`c!sayaç [#kanalEtiket 1000]\` 
**Sunucun için toplam bir rakam tut**

\`c!sayaç-kapat\` 
**Kurulu olan sayaç sistemi kapatır**

\`c!sayaç-kapat\` 
**Kurulu olan sayaç sistemi kapatır**


📢 Auto rol verir mi?
**Sunucunuza giren kullanıcıya vermesi için:** \`c!oto-role [@rolEtiket]\` **&** \`c!oto-role-kapat\` **ayarlamalısın.**`)
.setImage('https://media.giphy.com/media/XAwzAPJLnmZH7Vta24/giphy.gif?width=400&height=155').setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png'));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'sayaç-sistem'
};