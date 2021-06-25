const fs = require('fs');

module.exports = class JsonUtils
{
	constructor(client) {
		this.client = client;
	}

	/**
	 * Read and parse guild_config file
	 * @returns Object JSON
	 */
	getReadParseConf() {
		let file;
		try {
			file = JSON.parse(fs.readFileSync(this.client.config, 'utf-8'));
		} catch (e) {
			fs.writeFileSync(this.client.config, JSON.stringify([]), 'utf-8');
			file = JSON.parse(fs.readFileSync(this.client.config, 'utf-8'));
		}

		return file;
	}

	/**
	 * Get data by Guild
	 * @param id
	 * @returns {boolean|*} false if doesn't exist or data.
	 */
	getDataByGuild(id) {
		try {
			for (let i = 0; i < this.client.data.length; i++) {
				if (this.client.data[i].guild_id !== id)
					continue;
				return this.client.data[i];
			}
		} catch (e) {
			return false;
		}
	}

	/**
	 * Update data by guild
	 * @param id
	 * @param nameData Key
	 * @param valueData Value
	 */
	updateDataByGuild(id, nameData, valueData)
	{
		let data = this.getDataByGuild(id);

		if (data) {
			data[nameData] = valueData;
		}
		else {
			this.client.data.push({"guild_id": id, [nameData]: valueData});
		}

	}

	/**
	 * Delete data by guild
	 * @param id
	 */
	deleteDataByGuild(id)
	{
		let data = this.getDataByGuild(id);

		if (data)
		{
			let index = this.client.data.indexOf(data);
			this.client.data.splice(index, 1);
		}

	}

	/**
	 * Delete data by guild
	 * @param id
	 */
	deleteKeyByGuild(id, nameData)
	{
		let data = this.getDataByGuild(id);

		if (data)
		{
			let index = this.client.data.indexOf(data);
			if (this.client.data[index][nameData])
				delete this.client.data[index][nameData];
		}
	}

	/**
	 * Get value by key on guild
	 * @param id
	 * @param nameData key
	 * @returns {boolean|*} false if doesn't exist
	 */
	getKeyByGuild(id, nameData)
	{
		let data = this.getDataByGuild(id);

		try {
			return data[nameData];
		} catch (e) {
			return false;
		}
	}
}