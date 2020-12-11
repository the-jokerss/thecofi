const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  }

let images = ['https://media.giphy.com/media/mBkM18U5OMSkTcDmeu/giphy.gif', 'https://media.giphy.com/media/RGRzukK0YNlQbZEUVP/giphy.gif'];
message.channel.send(new Discord.MessageEmbed().setColor('#000001').setDescription(`**CloudUP Ana Menüsüne Hoş Geldin Dostum :innocent:
${client.user} Kullanırken \`@TheCofi\` rolünü en yukarıda tutunuz.**
**
🐝 \`c!diğer\`
Gerekli olabilecek komutlar

💸 \`c!kutusuz-mesaj-yönet\`
Kendinize özgün kutusuz normal olarak karşılama mesajı & hareketli GIF ayarlarsınız [ Ücretlidir. ]

💸 \`c!kutulu-mesaj-yönet\`
Kendinize özgün Kutu içerğinde karşılama mesajı & hareketli GIF ayarlarsınız [ Ücretlidir. ]

📋 \`c!kayıt-mesaj\`
Kayıt kanalında ki üyeleri karşılayan sistem

👌 \`c!sunucu-kayıt\`
İsimli ve etiket ile (Erkek - Kadın) kayıt sistem

✍️ \`c!mesaj-tag\`
Tag ayarlamak için kullanımı basit sistem

🍃 \`c!tagrol-sistem\`
Sunucunuz da tag ve ya emoji tarzı kullananlar için stabil sistem**

**🦋 \`c!isim\`**
İsmin başına birşey ekletmek için **c!isim-tag** kullanabilirsin. Etiketlediğiniz **üyenin ismini** değişirsiniz

**🍏 \`c!say\`**
Sunucu içerisinde ki **toplam üye**, **taglı üye**, **aktif üye**, **erkek üye**, **kadın üye** ve **Nitro boost** seviyenizi gösterir. **c!mesaj-tag** ve **c!sunucu-kayıt** sistemlerini aktif edin

**🎐 \`c!aktiflik aç\` & \`c!aktiflik kapat\`**
Aktiflik Sistem **(c!profile & c!profile [@etiket]**) **- ne kadar kayıt etmiş bilgilerini görebilirsin**

**🌟 \`c!koruma aç\` & \`c!koruma kapat\`**
Aktif Koruma Sistem **7 Adet Sunucunuz için koruma sistem aktif edersin**


💐 THE COFİLİA MODERASYON: :)
**`).setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png').setImage(images.random()))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'kayıt-yardım'
};