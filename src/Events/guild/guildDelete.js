const Event = require('../../Structures/Event.js');

module.exports = class extends Event {

	async run(guild)
	{
		this.client.jsonUtils.deleteDataByGuild(guild.id);
	}
}