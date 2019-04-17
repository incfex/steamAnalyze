var GetFriendList = async (steam_api, steam_id) => {
    return steam_api(
        "ISteamUser", "GetFriendList", "v0001", {steamid: steam_id,relationship:"friend" }
    );
}
var GetPlayerSummaries = async (steam_api, steam_id) => {
    return steam_api(
        "ISteamUser", "GetPlayerSummaries", "v0002", {steamids: steam_id }
    );
}

var AddNodeEdge = async (steam_api, steam_id,nd,ed,addNode,addEdge,visited) => {
    var output = await GetFriendList(steam_api, steam_id);
    
    for (var i = 0; i < output.friendslist.friends.length; i++) {
        var output2 = await GetPlayerSummaries(steam_api, output.friendslist.friends[i].steamid); 
        if(!visited.includes(output2.response.players[0].steamid)){
            visited.push(output2.response.players[0].steamid);
            addNode(output2.response.players[0].steamid, output2.response.players[0].personaname, output2.response.players[0].avatarfull, nd);
        }
        addEdge(steam_id, output2.response.players[0].steamid, ed);
    }
}
