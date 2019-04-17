
/*var get_tags_mins = (function () {
    async function get_weighted_tags (data) {
        var sorted = data.sort((a,b)=> b.playtime_forever - a.playtime_forever);
        var top5 = sorted.splice(0,5);
        var dict = {};
        top5.forEach(async e => {
            var tags = await get_game_tags(e.appid);
            tags.forEach(tag => {
                if (dict[tag]) dict[tag] += e.playtime_forever;
                else dict[tag] = e.playtime_forever;
            });
        });
        return dict;
    }

    return async function (data) {
        return get_weighted_tags(data);
    };
})();*/

async function get_tags_mins (data) {
    var sorted = data.sort((a,b)=> b.playtime_forever - a.playtime_forever);
    var dict = {};
    for (var i = 0; i < 5; i++) {
        var e = sorted[i];
        var tags = await get_game_tags(e.appid);
        tags.forEach(tag => {
            if (dict[tag]) dict[tag] += e.playtime_forever;
            else dict[tag] = e.playtime_forever;
        });
    }
    console.log("end get_tags.");
    return dict;
}