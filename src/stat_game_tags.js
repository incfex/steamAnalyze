var stat_game_tags = async function (steam_api, id) {
	var profile = await getProfile(steam_api, id);
	var tags = await get_tags_mins(profile.response.games);

	return {profile, tags};
};