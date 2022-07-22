const reqEvent = (event) => require(`./events/${event}`);
module.exports = client => {
  client.on('messageCreate', reqEvent('messageCreate'));
  console.log("[Başarılı]:Event Başarı İle Yüklendi")
};
//Buranın Anlamını Bilmiyorsan Dokanma Yoksa Bot Komutları Okuyamaz
//discord.gg/turkiyecode