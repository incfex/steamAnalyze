var SteamAPI = function (api_key) {
    return function (cat, method, version, params) {
        return new Promise ((res, rej) => {
            var query = '';
            for (key in params) query += `&${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `http://steam.kra.moe/${cat}/${method}/${version}?key=${api_key}&format=json${query}`);
            xhr.setRequestHeader('Accept-Language','en-US');
            xhr.send();
            xhr.onload = function () {
                if (this.status == 200) {
                    res(JSON.parse(xhr.response));
                } else rej('DEAD');
            };
        });
    };
};