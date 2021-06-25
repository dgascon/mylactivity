const Event = require('../../Structures/Event.js');

module.exports = class extends Event {

	async run(message) {
			const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);
			let data = this.client.jsonUtils.getDataByGuild(message.guild.id);
			let prefix = this.client.prefix;
			if (data) {
				if (data["prefix"] !== undefined)
					prefix = data["prefix"];
			}
			if (!message.guild || message.author.bot) return;

			this.client.jsonUtils.updateDataByGuild(message.guild.id, message.author.id, message.createdAt.toJSON());

			if (message.content.match(mentionRegex))
				message.channel.send(`My prefix for **${message.guild.name}** is \`${prefix}\`.`);

			if (message.content.match(mentionRegexPrefix))
				prefix = message.content.match(mentionRegexPrefix)[0];

			if (!message.content.startsWith(prefix)) return;

			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

			message.delete({timeout: this.client.delete_time});

			if (!message.member.hasPermission("ADMINISTRATOR"))
			{
				message.reply(`You have not permission.`).then(r => r.delete({timeout: this.client.delete_time}));
				return;
			}

			if (command) {
				command.run(message, args);
			}
	}
}