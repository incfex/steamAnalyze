function store_api(appid) {
    return new Promise ((r, j) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `http://store.kra.moe/api/appdetails/?appids=${appid}`);
        xhr.setRequestHeader('Accept-Language','en-US');
        xhr.send();
        xhr.onload = function () {
            if (this.status == 200) {
                r(JSON.parse(xhr.response));
            } else j('DEAD');
        };
    });
}