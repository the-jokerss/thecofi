const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.cache.filter(
    c => c.type === "voice"
  );
  let count = 0;
  let botlar = message.guild.members.cache.filter(m => m.user.bot).size;
  let textChannels = message.guild.channels.cache.filter(m => m.type == "text")
    .size;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  let codeuniverse = message.guild.members.cache.filter(
    m => !m.user.bot && m.user.presence.status !== "offline"
  ).size;
  const codeuniverse2 = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setThumbnail(`${message.guild.iconURL()}`)
    .setTitle("The Cofi | Sunucu Bilgileri")
    .addField(
      `:gem:**Sunucudaki Toplam Üye Sayısı**`,
      `**\`\`\`${message.guild.memberCount}\`\`\`**`
    )
    .addField(
      `:gem:**Toplam Çevrimiçi Üye Sayısı**`,
      `**\`\`\`${codeuniverse}\`\`\`**`
    )
    .addField(
`:gem:**Seslideki Üye Sayısı**`, `**\`\`\`${count}\`\`\`**`)
    .addField(
`:gem:**Yazı Kanalları**`, ` » **${textChannels}**`)
    .addField(
      ` :gem: **Ses Kanalları**`,
      `» ${
        message.guild.channels.cache.filter(chan => chan.type === "voice").size
      }`
    )
    .addField(`:gem:**Roller**`, `»  **${message.guild.roles.cache.size}**`)
    .addField(`:gem:**Emojiler**`, `»  **${message.guild.emojis.cache.size}**`)
    .addField(
      ` **👥Kullanıcılar**`,
      `💫 Çevrimiçi : **${
        message.guild.members.cache.filter(o => o.presence.status === "online")
          .size
      }** \n ⛔ Rahatsız Etmeyin : **${
        message.guild.members.cache.filter(dnd => dnd.presence.status === "dnd")
          .size
      }** \n :crescent_moon: Boşta: **${
        message.guild.members.cache.filter(i => i.presence.status === "idle")
          .size
      }** \n 🏳 Görünmez/Çevrimdışı : **${
        message.guild.members.cache.filter(
          off => off.presence.status === "offline"
        ).size
      }** \n  :shield:  Botlar : **${botlar}**`,
      true
    )
    .setFooter(`${message.author.tag}`, client.user.avatarURL());
  message.channel.send(codeuniverse2);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Sunucudaki kişilerin ön izlenmesini atar.",
  usage: "say"
};