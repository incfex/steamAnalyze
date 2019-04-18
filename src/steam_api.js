var SteamAPI = function (api_key) {
    if (!Array.isArray(api_key)) api_key = [api_key];

    var api_do = function (key, cat, method, version, params) {
        return new Promise((res, rej) => {
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

    return async function (...args) {
        console.log('avaliable keys: ', api_key);

        for (var i = 0; i < api_key.length; i++) {
            try {
                var rslt = await api_do(api_key[i], ...args);
                return rslt;
            } catch (e) {
                console.log(`[WARN] API key ${api_key[i]} error, try next: `, e);
                continue;
            }
        }

        return {};
    };
};