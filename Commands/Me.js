const Discord = require("discord.js");
const Database = require("../Helpers/Database");
// exports.onLoad = (client) => {};
/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {
    const db = new Database("./Servers/" + message.guild.id, "Invites");
    var data = db.get(`invites.${message.member.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };
    var embed = new Discord.MessageEmbed()
    .setDescription(`**Total:** \`${data.total || 0}\`, **Regular:** \`${data.regular || 0}\`, **Bonus:** \`${data.bonus || 0}\`, **Leave:** \`${data.leave || 0}\`, (**Fake:** \`${data.fake || 0}\`)`)
    .setColor("RANDOM");
    message.channel.send(embed);
};

exports.conf = {
    commands: ["me"],
    usage: "[p]me",
    enabled: true,
    guildOnly: true
};