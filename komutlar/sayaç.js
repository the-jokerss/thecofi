const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async function(client, message, args) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const codeuniverse = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        "Bunu kullanabilmek için `Yönetici` yetkisine sahip olmazız gerekmektedir."
      )
      .setFooter(
        `${client.user.username} Sayaç sistemi.`,
        message.guild.iconURL({ dynamic: true })
      )
      .setTimestamp();
    message.channel.send(codeuniverse);
    return;
  }
  if (args[0] == "sıfırla" || args[0] == "sifirla") {
    if ((await db.fetch(`sayacMiktar_${message.guild.id}`)) == null) {
      const codeuniverse = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription("Sunucuda sayaç sistemi zaten aktif değil.")
        .setFooter(
          `${client.user.username} Sayaç sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(codeuniverse);
      return;
    } else {
      await db.delete(`sayacMiktar_${message.guild.id}`);
      await db.delete(`sayacKanal_${message.guild.id}`);
      const codeuniverse = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription("Sunucudaki sayaç sistemi başarıyla sıfırlandı.")
        .setFooter(
          `${client.user.username} Sayaç sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(codeuniverse);
      return;
    }
  } else {
    if (await db.fetch(`sayacMiktar_${message.guild.id}`)) {
      const codeuniverse = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          "Sunucudaki sayaç sistemi zaten aktif!\n`Sıfırlamak için c!sayaç sıfırla`"
        )
        .setFooter(
          `${client.user.username} Sayaç sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(codeuniverse);
      return;
    }
    const kanal = message.mentions.channels.first();
    const miktar = args[1];
    if (!kanal) {
      const codeuniverse = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          "Bir kanal etiketlemelisin.\nDoğru kullanım v!sayaç #kanal {miktar} "
        )
        .setFooter(
          `${client.user.username} Sayaç sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(codeuniverse);
      return;
    } else if (isNaN(miktar)) {
      const codeuniverse = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          "Bir rakam girmelisin\nDoğru kullanım v!sayaç #kanal {miktar} "
        )
        .setFooter(
          `${client.user.username} Sayaç sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(codeuniverse);
      return;
    } else if (miktar <= message.guild.members.cache.size) {
      const codeuniverse = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription("Hedef üye şuanki üye sayısından yüksek olmalıdır.")
        .setFooter(
          `${client.user.username} Sayaç sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(codeuniverse);
      return;
    } else {
      await db.set(`sayacMiktar_${message.guild.id}`, miktar);
      await db.set(`sayacKanal_${message.guild.id}`, kanal.id);
      const codeuniverse = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          `Sunucudaki sayaç sistemi başarıyla aktif edildi.\nSayaç kanalı: ${kanal} \nMiktar: ${miktar}`
        )
        .setFooter(
          `${client.user.username} Sayaç sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
      message.channel.send(codeuniverse);
      return;
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sayaç"],
  permLevel: 0
};

exports.help = {
  name: "sayaç",
  description: "sayaç",
  usage: "sayaç"
};