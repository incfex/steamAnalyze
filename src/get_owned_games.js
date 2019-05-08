//give api wrapper needed arguments for getting user profile
var getProfile = async (steam_api, steam_id) => {
    return steam_api(
        "IPlayerService", "GetOwnedGames", "v0001", {steamid: steam_id,include_appinfo : 1, include_played_free_games : 1 }
    );
}