const Event = require('../../Structures/Event.js');

module.exports = class extends Event {

	async run(guild)
	{
		let chanText = guild.channels.cache.filter(x => x.type === 'text');
		await chanText.forEach(channel => {
			channel.messages.fetch({
				limit: 100
			}).then(messages => {
				messages.forEach(m => {
					if (!m.author.bot && guild.members.cache.find(x => x.id === m.author.id))
					{
						let dataByUser = this.client.jsonUtils.getKeyByGuild(guild.id, m.author.id);
						if (dataByUser)
						{
							dataByUser = new Date(dataByUser);
							if (dataByUser < m.createdAt)
								this.client.jsonUtils.updateDataByGuild(guild.id, m.author.id, m.createdAt.toJSON());
						}
						else
						{
							this.client.jsonUtils.updateDataByGuild(guild.id, m.author.id, m.createdAt.toJSON());
						}
					}
				})
			})
		});

		await guild.members.cache.forEach(member => {
			if (!member.user.bot)
			{
				if (!this.client.jsonUtils.getKeyByGuild(guild.id, member.user.id))
				{
					this.client.jsonUtils.updateDataByGuild(guild.id, member.user.id, member.joinedAt.toJSON());
				}
			}
		})
	}
}