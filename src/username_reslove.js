var username_reslove = async (api, vanityurl) => {
	var res = await api('ISteamUser', 'ResolveVanityURL', 'v0001', {vanityurl});
	return res.response.success === 1 ? res.response.steamid : vanityurl;
};