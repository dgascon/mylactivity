const Event = require('../../Structures/Event.js');

module.exports = class extends Event {

	async run(member)
	{
		this.client.jsonUtils.deleteKeyByGuild(member.guild.id, member.id);
	}
}