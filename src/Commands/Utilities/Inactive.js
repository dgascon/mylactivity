const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['inact'],
			description: 'This provides the current inactive users.',
			usages: 'inact [days (default:7)]',
			category: 'Utilities'
		});
	}

	async run(message, args) {
		let days = 7;
		if (args.length === 2)
			days = parseInt(args[1]);
		if (isNaN(days) || days <= 0) {
			message.reply(`Argument should by a number more than 0 !`).then(r => r.delete({timeout: this.client.delete_time}));
			return;
		}

		const embed = new MessageEmbed()
		embed.setColor('#ff0000')
		embed.setTitle(`Inactive users since ${days} days`)
		embed.setTimestamp()

		let data = this.client.utils.getUsersInactiveByDays(message.guild.id, days);

		if (data.length > 0)
		{
			for (const [key, v] of Object.entries(data))
			{
				let member = message.guild.members.cache.find(r => r.id === v.user_id).user;
				embed.addField(member.tag, `${v.diff} day(s) of inactivity\n`, true);
			}
		}
		else
		{
			embed.setDescription("**No users inactive**");
		}
		message.reply(embed);
	}
}