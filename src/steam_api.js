var SteamAPI = function (api_key) {
    // if api_key not an array, make it a array.
    if (!Array.isArray(api_key)) api_key = [api_key];

    // the actual api interaction logic
    var api_do = function (a_key, cat, method, version, params) {
        console.log('try with key: ', a_key);
        return new Promise((res, rej) => {
            var query = '';
            // convert object key-value dict to http get parameter
            for (var key in params) query += `&${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;

            /* xhr calls */
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `http://steam.kra.moe/${cat}/${method}/${version}?key=${a_key}&format=json${query}`);
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

        /* key rotations */
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